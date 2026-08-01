# 🏛️ ArCode-Core

ArCode-Core is the foundational repository of the ArCode Standard project.

It defines a structured system for Arabic scientific and technical terminology, aiming to unify and standardize modern knowledge in Arabic with global scientific compatibility.

---

## 🎯 Vision

To build a standardized Arabic scientific terminology system that can be used in:

- Computer Science
- Artificial Intelligence
- Networking
- Cybersecurity
- Mathematics
- Physics
- Biology
- and more

---

## 📚 What is ArCode?

ArCode is not a programming language.

It is a **scientific terminology standard system** designed to:

- Unify Arabic scientific terms
- Provide structured definitions
- Link Arabic and English scientific vocabulary
- Enable future academic and technological integration

---

## 🧠 Core Concept: ACS (ArCode Standard)

Each term in ArCode follows a structured format called:

**ACS - ArCode Standard**

Example structure:

```json
{
  "ACS_ID": "ACS-CS-0001",
  "AR_TERM": "خوارزمية",
  "EN_TERM": "Algorithm",
  "DOMAIN": "Computer Science",
  "DEFINITION_AR": "سلسلة خطوات منظمة لحل مشكلة.",
  "DEFINITION_EN": "A step-by-step procedure to solve a problem.",
  "RELATIONS": ["Data Structure", "Logic"],
  "STATUS": "Approved",
  "SOURCE": "ISO/IEC 2382",
  "VERSION": "1.0"
}
```

---

## 📈 Current Coverage

- **56 terms** in the dictionary (`dictionary.json`)
- 33 Computer Science terms (ACS-CS-0001 → ACS-CS-0040) — the most in-depth domain
- 13 registered domains with official codes

| Domain | Code | Terms |
|--------|------|-------|
| Computer Science | CS | 40 |
| Artificial Intelligence | AI | 3 |
| Networking | NET | 3 |
| Cybersecurity | SEC | 3 |
| Mathematics | MATH | 2 |
| Physics | PHYS | 2 |
| Biology | BIO | 2 |
| General Knowledge | GEN | 1 |

> Chemistry, Engineering, Medicine, Linguistics and Economics are registered but not yet covered.

---

## 🗂️ Repository Structure

```
ArCode-Core/
├── README.md               # This overview
├── naming_rules.md         # Naming rules (Arabic & English)
├── id_system.md            # ACS_ID format and domain codes
├── data_structure.md       # Term data structure
├── terminology_process.md  # Terminology adoption methodology
├── standard.json           # Canonical standard configuration
├── domain_list.json        # Registered domains with their codes
├── dictionary.json         # The terminology database
├── validate.js             # Automated validation script
├── CONTRIBUTING.md         # How to contribute
└── .github/
    ├── ISSUE_TEMPLATE/     # Term proposal & bug report templates
    └── PULL_REQUEST_TEMPLATE.md
```

---

## ✅ Validation

Run automated validation to ensure `dictionary.json` stays consistent with the standard:

```bash
npm run validate
```

The validator checks:

- Required fields on every term (including `SOURCE`)
- `ACS_ID` format and uniqueness
- `DOMAIN` matches its registered domain code
- `STATUS` is one of the allowed values
- `AR_TERM` is written in Arabic and not identical to `EN_TERM`

---

## 🤝 Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) to propose new terms or report issues.

## 🔗 Related

- [ArCode-Core](https://github.com/ArCode-Standard/ArCode-Core) — this repository
