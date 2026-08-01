const DATA_URL = "dictionary.json";
const RESULTS_LIMIT = 100;

let terms = [];
const searchEl = document.getElementById("search");
const domainEl = document.getElementById("domain");
const countEl = document.getElementById("count");
const resultsEl = document.getElementById("results");
const statTermsEl = document.getElementById("statTerms");

async function load() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    terms = data.terms || [];
    populateDomains();
    render();
  } catch (err) {
    resultsEl.innerHTML =
      '<div class="empty">' + escapeHtml(t("load.error")) + ": " + escapeHtml(err.message) + "</div>";
  }
}

function populateDomains() {
  const map = new Map();
  terms.forEach((tr) => map.set(tr.DOMAIN, (map.get(tr.DOMAIN) || 0) + 1));
  const all = document.createElement("option");
  all.value = "";
  all.textContent = t("domain.all") + " (" + terms.length.toLocaleString("en-US") + ")";
  domainEl.appendChild(all);
  [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], ACD_LANG === "ar" ? "ar" : "en"))
    .forEach(([name, n]) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name + " (" + n.toLocaleString("en-US") + ")";
      domainEl.appendChild(opt);
    });
}

function filter() {
  const q = searchEl.value.trim().toLowerCase();
  const dom = domainEl.value;
  let list = terms;
  if (dom) list = list.filter((tr) => tr.DOMAIN === dom);
  if (q) {
    list = list.filter(
      (tr) =>
        (tr.AR_TERM || "").toLowerCase().includes(q) ||
        (tr.EN_TERM || "").toLowerCase().includes(q) ||
        (tr.ACS_ID || "").toLowerCase().includes(q) ||
        (tr.DEFINITION_AR || "").toLowerCase().includes(q) ||
        (tr.DEFINITION_EN || "").toLowerCase().includes(q)
    );
  }
  return list;
}

function render() {
  const list = filter();
  countEl.textContent = list.length.toLocaleString("en-US") + " " + t("count.terms");
  if (statTermsEl && terms.length) statTermsEl.textContent = terms.length.toLocaleString("en-US");
  if (!list.length) {
    resultsEl.innerHTML = '<div class="empty">' + escapeHtml(t("results.empty")) + "</div>";
    return;
  }
  resultsEl.innerHTML = list
    .slice(0, RESULTS_LIMIT)
    .map(
      (tr) => `
      <article class="card">
        <div class="cardhead">
          <span class="id">${escapeHtml(tr.ACS_ID)}</span>
          <span class="domain">${escapeHtml(tr.DOMAIN)}</span>
        </div>
        <div class="terms">
          <span class="ar">${escapeHtml(tr.AR_TERM)}</span>
          <span class="en">${escapeHtml(tr.EN_TERM)}</span>
        </div>
        <div class="def">${escapeHtml(tr.DEFINITION_AR)}</div>
        <div class="def def-en" dir="ltr" style="text-align:left">${escapeHtml(tr.DEFINITION_EN)}</div>
        <div class="source">${escapeHtml(t("by"))}: ${escapeHtml(tr.SOURCE || "")} · ${escapeHtml(tr.STATUS || "")}</div>
      </article>`
    )
    .join("");
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function onLangChange() {
  const keep = searchEl.value;
  domainEl.innerHTML = '<option value="">—</option>';
  populateDomains();
  searchEl.value = keep;
  render();
}
window.onLangChange = onLangChange;

searchEl.addEventListener("input", render);
domainEl.addEventListener("change", render);

load();
