# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
