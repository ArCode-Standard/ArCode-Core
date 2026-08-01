#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const readJson = (file) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf8"));

const standard = readJson("standard.json");
const domainList = readJson("domain_list.json");
const dictionary = readJson("dictionary.json");

const ARABIC_RE = /[\u0600-\u06FF]/;
const ID_RE = /^ACS-[A-Z]{2,4}-\d{4}$/;
const errors = [];
const usedIds = new Set();

function fail(msg) {
  errors.push(msg);
}

const codeToName = new Map(
  Object.entries(standard.domain_codes)
);
const listCodes = new Set(domainList.domains.map((d) => d.code));
const listNames = new Set(domainList.domains.map((d) => d.name));

for (const code of codeToName.keys()) {
  if (!listCodes.has(code)) {
    fail(`standard.json: domain code "${code}" missing from domain_list.json`);
  }
}
for (const name of codeToName.values()) {
  if (!listNames.has(name)) {
    fail(`standard.json: domain name "${name}" missing from domain_list.json`);
  }
}

dictionary.terms.forEach((term) => {
  const id = term.ACS_ID || "";

  for (const field of standard.term_required_fields) {
    if (term[field] === undefined || term[field] === "") {
      fail(`${id}: missing required field "${field}"`);
    }
  }

  if (!ID_RE.test(id)) {
    fail(`${id || "?"}: invalid ACS_ID format (expected ACS-XXX-0000)`);
  } else {
    if (usedIds.has(id)) {
      fail(`${id}: duplicate ACS_ID`);
    }
    usedIds.add(id);

    const code = id.split("-")[1];
    const expectedName = codeToName.get(code);
    if (!expectedName) {
      fail(`${id}: unknown domain code "${code}"`);
    } else if (term.DOMAIN !== expectedName) {
      fail(
        `${id}: DOMAIN "${term.DOMAIN}" does not match code "${code}" (expected "${expectedName}")`
      );
    }
  }

  if (!ARABIC_RE.test(term.AR_TERM || "")) {
    fail(`${id}: AR_TERM must be written in Arabic`);
  }
  if ((term.AR_TERM || "").trim() === (term.EN_TERM || "").trim()) {
    fail(`${id}: AR_TERM and EN_TERM must not be identical`);
  }
  if (!standard.allowed_status_values.includes(term.STATUS)) {
    fail(
      `${id}: invalid STATUS "${term.STATUS}" (allowed: ${standard.allowed_status_values.join(", ")})`
    );
  }
});

if (errors.length) {
  console.error(`ArCode validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"}):`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}

console.log(
  `ArCode validation passed: ${dictionary.terms.length} terms, all consistent.`
);
