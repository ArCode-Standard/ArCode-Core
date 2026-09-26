const assert = require("assert");
const api = require("./index.js");

assert.strictEqual(api.meta.termCount, 20000, "termCount should be 20000");
assert.strictEqual(api.terms.length, 20000);

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
assert.strictEqual(doms.length, 20, "should have 20 domains");

console.log("All tests passed ✓");
