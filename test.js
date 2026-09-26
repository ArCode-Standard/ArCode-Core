const assert = require("assert");
const api = require("./index.js");

const EXPECTED_TERM_COUNT = 18065;
const EXPECTED_DOMAIN_COUNT = 19;
const RES_MIN_TERMS = 55;

assert.strictEqual(api.meta.termCount, EXPECTED_TERM_COUNT, `termCount should be ${EXPECTED_TERM_COUNT}`);
assert.strictEqual(api.terms.length, EXPECTED_TERM_COUNT);

const cs1 = api.byId("ACS-CS-0001");
assert(cs1 && cs1.DOMAIN === "Computer Science", "byId should find ACS-CS-0001");

assert.strictEqual(typeof api.createApi, "function", "createApi should be exported for flexible API creation");
const customApi = api.createApi();
assert(customApi && typeof customApi.search === "function", "createApi should return a usable API object");

const res = api.search("algorithm", { limit: 5 });
assert(Array.isArray(res) && res.length > 0, "search should return results");

const law = api.byDomain("Law", { limit: 3 });
assert(law.length === 3 && law[0].DOMAIN === "Law", "byDomain should filter Law");

const doms = api.domains();
assert.strictEqual(doms.length, EXPECTED_DOMAIN_COUNT, `should have ${EXPECTED_DOMAIN_COUNT} domains`);

const resDom = doms.find((d) => d.name === "Renewable Energy and Sustainability");
assert(resDom, "Renewable Energy and Sustainability domain should exist");
assert(
  resDom.count >= RES_MIN_TERMS,
  `RES domain should hold at least ${RES_MIN_TERMS} terms (found ${resDom.count})`
);

const res1 = api.byId("ACS-RES-0001");
assert(res1 && res1.DOMAIN === "Renewable Energy and Sustainability", "byId should find ACS-RES-0001");
assert(res1.SOURCE.includes("Energy Information Administration"), "RES terms must cite a real source");

console.log("All tests passed ✓");
