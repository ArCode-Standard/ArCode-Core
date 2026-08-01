# 🏛️ ArCode-Core

![Validation](https://github.com/ArCode-Standard/ArCode-Core/actions/workflows/validate.yml/badge.svg)

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

- **13000 terms** in the dictionary (`dictionary.json`)
- **1000 Computer Science terms** (ACS-CS-0001 → ACS-CS-1000) — a complete, dedicated dictionary covering theory of computation, data structures, algorithms, programming paradigms, software engineering, operating systems, concurrency, databases, computer architecture, hardware, networking basics, security and more
- **1000 Artificial Intelligence terms** (ACS-AI-0001 → ACS-AI-1000) — a complete, dedicated dictionary covering machine learning, classical ML algorithms, deep learning, neural networks, NLP, computer vision, reinforcement learning, robotics, generative AI, large language models, AI ethics and governance
- **1000 Networking terms** (ACS-NET-0001 → ACS-NET-1000) — a complete, dedicated dictionary covering network fundamentals, OSI/TCP/IP layers, protocols, routing and switching, network devices, wireless networks, network security, cloud networking, network management and emerging concepts
- **1000 Cybersecurity terms** (ACS-SEC-0001 → ACS-SEC-1000) — a comprehensive, dedicated dictionary covering cryptography, network security, malware, attack techniques, access control, security operations, incident response, digital forensics, threat intelligence, risk management, governance, compliance, cloud/container security, zero trust and security frameworks
- **1000 Mathematics terms** (ACS-MATH-0001 → ACS-MATH-1000) — a comprehensive, dedicated dictionary covering arithmetic, algebra, geometry, trigonometry, calculus, linear algebra, differential equations, analysis, probability, statistics, number theory, graph theory, logic, discrete mathematics and applied mathematics
- **1000 Physics terms** (ACS-PHYS-0001 → ACS-PHYS-1000) — a complete, dedicated dictionary covering mechanics, thermodynamics, waves, optics, electromagnetism, circuits, modern physics, quantum mechanics, solid state physics and astrophysics
- **1000 Biology terms** (ACS-BIO-0001 → ACS-BIO-1000) — a complete, dedicated dictionary covering cell biology, molecular biology, genetics, anatomy, physiology, botany, zoology, ecology, evolution, microbiology, immunology and biotechnology
- **1000 Chemistry terms** (ACS-CHEM-0001 → ACS-CHEM-1000) — a complete, dedicated dictionary covering atomic structure, chemical bonding, organic chemistry, physical chemistry, analytical chemistry, inorganic chemistry, nuclear chemistry and biochemistry
- **1000 Engineering terms** (ACS-ENG-0001 → ACS-ENG-1000) — a complete, dedicated dictionary covering mechanical, civil, electrical, electronic, chemical, industrial, software and aerospace engineering
- **1000 Medicine terms** (ACS-MED-0001 → ACS-MED-1000) — a complete, dedicated dictionary covering anatomy, physiology, pathology, clinical medicine, pharmacology, therapeutics, public health, pediatrics, psychiatry and emergency medicine
- **1000 Linguistics terms** (ACS-LING-0001 → ACS-LING-1000) — a complete, dedicated dictionary covering phonetics, phonology, morphology, syntax, semantics, pragmatics, sociolinguistics, psycholinguistics, historical linguistics, computational linguistics and applied linguistics
- **1000 Economics terms** (ACS-ECON-0001 → ACS-ECON-1000) — a complete, dedicated dictionary covering microeconomics, macroeconomics, finance, banking, international trade, development economics, labor economics and public economics
- **1000 General Knowledge terms** (ACS-GEN-0001 → ACS-GEN-1000) — a complete, dedicated dictionary covering the scientific method, measurement, mathematics basics, earth and space sciences, life and health basics, society, culture, technology and education
- 13 registered domains with official codes, all covered

| Domain | Code | Terms |
|--------|------|-------|
| Computer Science | CS | 1000 |
| Artificial Intelligence | AI | 1000 |
| Networking | NET | 1000 |
| Cybersecurity | SEC | 1000 |
| Mathematics | MATH | 1000 |
| Physics | PHYS | 1000 |
| Biology | BIO | 1000 |
| Chemistry | CHEM | 1000 |
| Engineering | ENG | 1000 |
| Medicine | MED | 1000 |
| Linguistics | LING | 1000 |
| Economics | ECON | 1000 |
| General Knowledge | GEN | 1000 |

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

## ⚖️ License

ArCode-Core is dual-licensed; the applicable license depends on the file:

| Files                                                       | License      | Reason                                                      |
| ----------------------------------------------------------- | ------------ | ----------------------------------------------------------- |
| `dictionary.json`, definitions, documentation (`*.md`)      | **CC-BY-SA 4.0** | Protects the standard from fragmentation and keeps improvements open |
| `validate.js`, scripts, and build tooling                   | **Apache 2.0**   | Protects the code and allows companies to use the tools freely |

Full texts: [`LICENSE-CC-BY-SA-4.0`](LICENSE-CC-BY-SA-4.0) and [`LICENSE-APACHE-2.0`](LICENSE-APACHE-2.0). See [`LICENSE`](LICENSE) for details.

## 🔗 Related

- [ArCode-Core](https://github.com/ArCode-Standard/ArCode-Core) — this repository
