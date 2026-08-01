"use strict";

const fs = require("fs");
const path = require("path");

const dictionary = JSON.parse(
  fs.readFileSync(path.join(__dirname, "dictionary.json"), "utf8")
);

function search(query, opts = {}) {
  const { domain, status, limit = 50 } = opts;
  const q = String(query || "").trim().toLowerCase();
  const dom = domain ? String(domain).toLowerCase() : "";
  let results = dictionary.terms;
  if (dom) results = results.filter((t) => String(t.DOMAIN).toLowerCase().includes(dom));
  if (status) results = results.filter((t) => t.STATUS === status);
  if (q) {
    results = results.filter(
      (t) =>
        (t.AR_TERM || "").toLowerCase().includes(q) ||
        (t.EN_TERM || "").toLowerCase().includes(q) ||
        (t.ACS_ID || "").toLowerCase().includes(q)
    );
  }
  return results.slice(0, limit);
}

function byId(id) {
  return dictionary.terms.find((t) => t.ACS_ID === id) || null;
}

function byDomain(domain, opts = {}) {
  const { status, limit } = opts;
  return search("", { domain, status, limit });
}

function domains() {
  const map = {};
  dictionary.terms.forEach((t) => {
    map[t.DOMAIN] = (map[t.DOMAIN] || 0) + 1;
  });
  return Object.entries(map).map(([name, count]) => ({ name, count }));
}

module.exports = {
  terms: dictionary.terms,
  meta: {
    project: dictionary.project,
    standard: dictionary.standard,
    version: dictionary.version,
    language: dictionary.language,
    description: dictionary.description,
    termCount: dictionary.terms.length,
  },
  search,
  byId,
  byDomain,
  domains,
};
