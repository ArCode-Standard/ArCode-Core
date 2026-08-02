"use strict";

const fs = require("fs");
const path = require("path");

const dictionary = JSON.parse(
  fs.readFileSync(path.join(__dirname, "dictionary.json"), "utf8")
);

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function createApi(data = dictionary) {
  const terms = Array.isArray(data.terms) ? data.terms : [];
  const termLookup = new Map();
  const domainBuckets = new Map();
  const statusBuckets = new Map();
  const domainCounts = new Map();

  const indexedTerms = terms.map((term) => ({
    ...term,
    _searchText: [term.AR_TERM, term.EN_TERM, term.ACS_ID]
      .filter(Boolean)
      .map((value) => normalizeText(value))
      .join(" "),
  }));

  indexedTerms.forEach((term) => {
    termLookup.set(term.ACS_ID, term);

    const domain = String(term.DOMAIN || "").trim();
    if (domain) {
      if (!domainBuckets.has(domain)) {
        domainBuckets.set(domain, []);
      }
      domainBuckets.get(domain).push(term);
      domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
    }

    const status = String(term.STATUS || "").trim();
    if (status) {
      if (!statusBuckets.has(status)) {
        statusBuckets.set(status, []);
      }
      statusBuckets.get(status).push(term);
    }
  });

  function getCandidates(domain = "", status = "") {
    const dom = normalizeText(domain);
    const sta = normalizeText(status);

    let candidates = indexedTerms;

    if (dom) {
      const matchingDomains = [...domainBuckets.keys()].filter((name) =>
        normalizeText(name).includes(dom)
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

  return {
    terms: indexedTerms,
    meta: {
      project: data.project,
      standard: data.standard,
      version: data.version,
      language: data.language,
      description: data.description,
      termCount: indexedTerms.length,
    },
    search,
    byId,
    byDomain,
    domains,
    createApi,
  };
}

const api = createApi(dictionary);

module.exports = {
  ...api,
  createApi,
};
