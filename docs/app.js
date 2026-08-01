const DATA_URL = "dictionary.json";
const RESULTS_LIMIT = 50;

let allTerms = [];
let activeDomain = "all";

const searchInput = document.getElementById("searchInput");
const domainFiltersEl = document.getElementById("domainFilters");
const resultsCountEl = document.getElementById("resultsCount");
const resultsListEl = document.getElementById("resultsList");

/* ---- Theme ---- */
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", saved || prefers);
})();

/* ---- Keyboard shortcut ---- */
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    searchInput.focus();
  }
});

/* ---- Load ---- */
async function loadDictionary() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    allTerms = data.terms || [];
    document.getElementById("statTerms").textContent = allTerms.length.toLocaleString("en-US");
    renderFilters();
    renderResults();
  } catch (err) {
    resultsListEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <div class="empty-title">${escapeHtml(t("error.title"))}</div>
        <div class="empty-desc">${escapeHtml(t("error.desc"))} ${escapeHtml(err.message)}</div>
      </div>
    `;
  }
}

/* ---- Filters ---- */
function domainList() {
  const map = new Map();
  allTerms.forEach((tr) => map.set(tr.DOMAIN, (map.get(tr.DOMAIN) || 0) + 1));
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0], "en"));
}

function renderFilters() {
  const chips = [
    `<button class="filter-chip ${activeDomain === "all" ? "active" : ""}" data-domain="all">${escapeHtml(t("all"))}</button>`
  ];
  domainList().forEach(([name, n]) => {
    const label = t("dom." + name) || name;
    chips.push(
      `<button class="filter-chip ${activeDomain === name ? "active" : ""}" data-domain="${escapeHtml(name)}">${escapeHtml(label)}</button>`
    );
  });
  domainFiltersEl.innerHTML = chips.join("");
  domainFiltersEl.querySelectorAll(".filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeDomain = btn.getAttribute("data-domain");
      renderFilters();
      renderResults();
    });
  });
}

/* ---- Search & render ---- */
function filteredTerms() {
  const q = searchInput.value.trim().toLowerCase();
  let list = allTerms;
  if (activeDomain !== "all") {
    list = list.filter((tr) => tr.DOMAIN === activeDomain);
  }
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

function pluralCount(n) {
  const key = n === 1 ? "results.count.one" : "results.count";
  return n.toLocaleString("en-US") + " " + t(key);
}

function renderResults() {
  const list = filteredTerms();
  resultsCountEl.innerHTML = `<strong>${list.length.toLocaleString("en-US")}</strong> ${escapeHtml(t(list.length === 1 ? "results.count.one" : "results.count"))}`;

  if (!list.length) {
    resultsListEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">${escapeHtml(t("empty.title"))}</div>
        <div class="empty-desc">${escapeHtml(t("empty.desc"))}</div>
      </div>
    `;
    return;
  }

  resultsListEl.innerHTML = list.slice(0, RESULTS_LIMIT).map((term) => {
    const domLabel = t("dom." + term.DOMAIN) || term.DOMAIN;
    return `
      <article class="term-item">
        <div class="term-item-header">
          <div>
            <div class="term-item-title">${escapeHtml(term.AR_TERM)}</div>
            <div class="term-item-en">${escapeHtml(term.EN_TERM)}</div>
          </div>
          <div class="term-item-meta">
            <span class="term-badge">${escapeHtml(domLabel)}</span>
            <span class="term-id">${escapeHtml(term.ACS_ID)}</span>
          </div>
        </div>
        <div class="term-item-body">
          <div class="term-def-ar">${escapeHtml(term.DEFINITION_AR)}</div>
          <div class="term-def-en" dir="ltr" style="text-align:left">${escapeHtml(term.DEFINITION_EN)}</div>
        </div>
        <div class="term-item-footer">
          <div class="term-source">
            <strong>${escapeHtml(t("term.source"))}</strong> ${escapeHtml(term.SOURCE || "N/A")}
          </div>
          <div class="term-actions">
            <button class="term-action-btn" data-copy="${escapeHtml(term.ACS_ID)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span class="copy-label">${escapeHtml(t("copy"))}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  resultsListEl.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => copyTerm(btn.getAttribute("data-copy"), btn));
  });
}

function copyTerm(acsId, btn) {
  const term = allTerms.find((tr) => tr.ACS_ID === acsId);
  if (!term) return;
  const text = `${term.AR_TERM} / ${term.EN_TERM} — ${term.ACS_ID}`;
  navigator.clipboard.writeText(text).then(() => {
    const label = btn.querySelector(".copy-label");
    label.textContent = t("copied");
    setTimeout(() => (label.textContent = t("copy")), 1500);
  });
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---- Language switch re-render ---- */
function onLangChange() {
  renderFilters();
  renderResults();
}
window.onLangChange = onLangChange;

searchInput.addEventListener("input", renderResults);

loadDictionary();
