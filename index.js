"use strict";

const fs = require("fs");
const path = require("path");

const dictionary = JSON.parse(
  fs.readFileSync(path.join(__dirname, "dictionary.json"), "utf8")
);

const terms = Array.isArray(dictionary.terms) ? dictionary.terms : [];
const termLookup = new Map();
const domainBuckets = new Map();
const statusBuckets = new Map();
const domainCounts = new Map();

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function buildIndexes() {
  terms.forEach((term, index) => {
    const normalizedTerm = {
      ...term,
      _searchText: [term.AR_TERM, term.EN_TERM, term.ACS_ID]
        .filter(Boolean)
        .map((value) => normalizeText(value))
        .join(" "),
    };

    terms[index] = normalizedTerm;
    termLookup.set(normalizedTerm.ACS_ID, normalizedTerm);

    const domain = String(normalizedTerm.DOMAIN || "").trim();
    if (domain) {
      if (!domainBuckets.has(domain)) {
        domainBuckets.set(domain, []);
      }
      domainBuckets.get(domain).push(normalizedTerm);

      domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
    }

    const status = String(normalizedTerm.STATUS || "").trim();
    if (status) {
      if (!statusBuckets.has(status)) {
        statusBuckets.set(status, []);
      }
      statusBuckets.get(status).push(normalizedTerm);
    }
  });
}

buildIndexes();

function getCandidates(domain = "", status = "") {
  const dom = normalizeText(domain);
  const sta = normalizeText(status);

  let candidates = terms;

  if (dom) {
    const matchingDomains = [...domainBuckets.keys()].filter((name) =>
      name.toLowerCase().includes(dom)
    );

    if (!matchingDomains.length) {
      return [];
    }

    const matchedTerms = [];
    matchingDomains.forEach((name) => {
      matchedTerms.push(...domainBuckets.get(name));
    });
    candidates = matchedTerms;
  }

  if (sta) {
    const statusTerms = statusBuckets.get(sta) || [];
    const statusSet = new Set(statusTerms);
    candidates = candidates.filter((term) => statusSet.has(term));
  }

  return candidates;
}

function search(query, opts = {}) {
  const { domain, status, limit = 50 } = opts;
  const q = normalizeText(query);
  const candidates = getCandidates(domain, status);

  if (!q) {
    return candidates.slice(0, limit);
  }

  return candidates
    .filter((term) => term._searchText.includes(q))
    .slice(0, limit);
}

function byId(id) {
  return termLookup.get(String(id || "")) || null;
}

function byDomain(domain, opts = {}) {
  const { status, limit } = opts;
  return search("", { domain, status, limit });
}

function domains() {
  return [...domainCounts.entries()].map(([name, count]) => ({ name, count }));
}

module.exports = {
  terms,
  meta: {
    project: dictionary.project,
    standard: dictionary.standard,
    version: dictionary.version,
    language: dictionary.language,
    description: dictionary.description,
    termCount: terms.length,
  },
  search,
  byId,
  byDomain,
  domains,
};
