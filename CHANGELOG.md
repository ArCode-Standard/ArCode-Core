# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New domain `RES` — Renewable Energy and Sustainability / الطاقة المتجددة والاستدامة
- 345 sourced terms so far (`ACS-RES-0001` … `ACS-RES-0345`), each with an Arabic term,
  an Arabic definition, an English definition, and a named source:
  - 213 from the U.S. Energy Information Administration (EIA) glossary: <https://www.eia.gov/tools/glossary/>
  - 14 from the International Energy Agency (IEA) glossary: <https://www.iea.org/glossary>
  - 76 from the IPCC AR6 Working Group III glossary: <https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_Annex-I.pdf>
  - 42 from the IPCC 2019 Refinement glossary: <https://www.ipcc.ch/site/assets/uploads/2019/06/19R_V0_02_Glossary_advance.pdf>
- `test.js` now pins the expected term/domain counts and asserts the RES domain exists,
  only grows, and that every RES term carries a source plus both definitions

### Changed

- `standard.json` and `domain_list.json` updated with the `RES` domain code
- `docs/i18n.js`: added the RES domain label (Arabic + English) and removed leftover
  `Renewable Energy` / `Quantum Computing` keys from the reverted placeholder domains
- Regenerated `docs/api/stats.json`, `docs/api/domains.json`, and `docs/api/search-index.json`
  (18,010 → 18,355 terms, 18 → 19 domains)
- Dictionary now totals 18,355 terms across 19 domains

## [1.2.0] - 2026-08-01

### Added

- Bilingual (Arabic/English) website with a language toggle (`docs/`)
- New pages: API documentation (`docs/api.html`) and project wiki (`docs/wiki.html`)
- Static JSON API endpoints: `/api/domains.json` and `/api/stats.json`
- Browser client library `docs/api.js` (`ArCodeAPI`) with `search` / `byId` / `byDomain` / `domains`
- Shared i18n layer `docs/i18n.js` (86 keys per language)

### Changed

- Redesigned `docs/index.html` with hero stats (18,000 terms / 18 domains), sticky navigation, and a language toggle button
- Removed all blockchain / wallet ("Connect Wallet") UI from the website
- All numeric counters keep Latin digits (`toLocaleString("en-US")`)

## [1.1.0] - 2026-08-01

### Added

- 5 new domains: Law, Agriculture, Astronomy, Geology, Statistics (1,000 terms each)
- Total dictionary expanded from 13,000 to 18,000 terms (18 domains × 1,000)

### Changed

- `standard.json` and `domain_list.json` updated with the 5 new domain codes
- `README.md` coverage and table updated

## [1.0.0] - 2026-08-01

### Added

- Complete dictionary of 13,000 terms (1,000 per domain across 13 domains)
- Full terminology standard: `standard.json`, `domain_list.json`, `dictionary.json`
- Validation tooling: `validate.js` and `npm run validate`
- Documentation: naming rules, ID system, data structure, terminology process
- Contribution templates: issue templates and pull request template

### Changed

- All terms set to `Approved` status
- Fixed duplicate terms within domains
- Enforced intra-domain uniqueness (EN_TERM / AR_TERM) in validation

### License

- Dual licensing: CC-BY-SA 4.0 (content) and Apache 2.0 (code)
