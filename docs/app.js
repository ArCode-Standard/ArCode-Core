const DATA_URL = "dictionary.json";

let terms = [];
const searchEl = document.getElementById("search");
const domainEl = document.getElementById("domain");
const countEl = document.getElementById("count");
const resultsEl = document.getElementById("results");

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
      '<div class="empty">تعذّر تحميل القاموس: ' + escapeHtml(err.message) + "</div>";
  }
}

function populateDomains() {
  const map = new Map();
  terms.forEach((t) => map.set(t.DOMAIN, (map.get(t.DOMAIN) || 0) + 1));
  [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], "ar"))
    .forEach(([name, n]) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name + " (" + n + ")";
      domainEl.appendChild(opt);
    });
}

function render() {
  const q = searchEl.value.trim().toLowerCase();
  const dom = domainEl.value;
  let list = terms;
  if (dom) list = list.filter((t) => t.DOMAIN === dom);
  if (q) {
    list = list.filter(
      (t) =>
        (t.AR_TERM || "").toLowerCase().includes(q) ||
        (t.EN_TERM || "").toLowerCase().includes(q) ||
        (t.ACS_ID || "").toLowerCase().includes(q) ||
        (t.DEFINITION_AR || "").toLowerCase().includes(q) ||
        (t.DEFINITION_EN || "").toLowerCase().includes(q)
    );
  }
  countEl.textContent = list.length.toLocaleString("ar-EG") + " مصطلح";
  if (!list.length) {
    resultsEl.innerHTML = '<div class="empty">لا توجد نتائج مطابقة</div>';
    return;
  }
  resultsEl.innerHTML = list
    .slice(0, 200)
    .map(
      (t) => `
      <article class="card">
        <div class="id">${escapeHtml(t.ACS_ID)}</div>
        <div class="terms">
          <span class="ar">${escapeHtml(t.AR_TERM)}</span>
          <span class="en">${escapeHtml(t.EN_TERM)}</span>
        </div>
        <span class="domain">${escapeHtml(t.DOMAIN)}</span>
        <div class="def">${escapeHtml(t.DEFINITION_AR)}</div>
        <div class="def" dir="ltr" style="text-align:left">${escapeHtml(t.DEFINITION_EN)}</div>
        <div class="source">${escapeHtml(t.SOURCE || "")}</div>
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

searchEl.addEventListener("input", render);
domainEl.addEventListener("change", render);

load();
