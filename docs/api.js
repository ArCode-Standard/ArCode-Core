/**
 * ArCode API client (browser / bundler friendly).
 * Base URLs are exposed as documented endpoints on GitHub Pages.
 *
 * Endpoints (static JSON):
 *   https://arcode-standard.github.io/ArCode-Core/dictionary.json   full dataset
 *   https://arcode-standard.github.io/ArCode-Core/api/domains.json  domains + counts
 *   https://arcode-standard.github.io/ArCode-Core/api/stats.json    project stats
 */
(function (global) {
  "use strict";

  const DEFAULT_BASE = "https://arcode-standard.github.io/ArCode-Core";

  class ArCodeAPI {
    constructor(options = {}) {
      this.base = String(options.base || DEFAULT_BASE).replace(/\/+$/, "");
      this._terms = null;
      this._loaded = null;
    }

    async _load() {
      if (this._loaded) return this._loaded;
      this._loaded = fetch(this.base + "/dictionary.json").then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      });
      return this._loaded;
    }

    async meta() {
      const data = await this._load();
      return {
        project: data.project,
        standard: data.standard,
        version: data.version,
        language: data.language,
        description: data.description,
        termCount: data.terms.length,
      };
    }

    async search(query = "", options = {}) {
      const { domain, status, limit = 50 } = options;
      const data = await this._load();
      const q = String(query).trim().toLowerCase();
      const dom = domain ? String(domain).toLowerCase() : "";
      let results = data.terms;
      if (dom) results = results.filter((t) => String(t.DOMAIN).toLowerCase().includes(dom));
      if (status) results = results.filter((t) => t.STATUS === status);
      if (q) {
        results = results.filter(
          (t) =>
            (t.AR_TERM || "").toLowerCase().includes(q) ||
            (t.EN_TERM || "").toLowerCase().includes(q) ||
            (t.ACS_ID || "").toLowerCase().includes(q) ||
            (t.DEFINITION_AR || "").toLowerCase().includes(q) ||
            (t.DEFINITION_EN || "").toLowerCase().includes(q)
        );
      }
      return results.slice(0, limit);
    }

    async byId(id) {
      const data = await this._load();
      return data.terms.find((t) => t.ACS_ID === id) || null;
    }

    async byDomain(domain, options = {}) {
      return this.search("", { ...options, domain });
    }

    async domains() {
      const res = await fetch(this.base + "/api/domains.json");
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }

    async stats() {
      const res = await fetch(this.base + "/api/stats.json");
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }
  }

  global.ArCodeAPI = ArCodeAPI;
})(typeof window !== "undefined" ? window : globalThis);
