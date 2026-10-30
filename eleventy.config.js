// Eleventy-Konfiguration – SVP Grüningen
// Inhalte liegen in src/news, src/termine, src/parolen, src/seiten und src/_data
// und werden über Pages CMS (Datei .pages.yml) bearbeitet.

const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const MONATE_KURZ = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

const toDate = (d) => (d instanceof Date ? d : new Date(d));
const heute = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Datumsformate (Schweiz)
  eleventyConfig.addFilter("datumLang", (d) => { d = toDate(d); return `${d.getUTCDate()}. ${MONATE[d.getUTCMonth()]} ${d.getUTCFullYear()}`; });
  eleventyConfig.addFilter("datumKurz", (d) => { d = toDate(d); return `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${d.getUTCFullYear()}`; });
  eleventyConfig.addFilter("tag", (d) => String(toDate(d).getUTCDate()).padStart(2, "0"));
  eleventyConfig.addFilter("monatKurz", (d) => MONATE_KURZ[toDate(d).getUTCMonth()]);
  eleventyConfig.addFilter("isoDatum", (d) => toDate(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("jahr", () => new Date().getFullYear());
  eleventyConfig.addFilter("initialen", (name = "") => name.split(/\s+/).filter(Boolean).map((t) => t[0]).slice(0, 2).join("").toUpperCase());
  eleventyConfig.addFilter("limit", (arr = [], n) => arr.slice(0, n));
  eleventyConfig.addFilter("nachEbene", (arr = [], ebene) => arr.filter((p) => p.ebene === ebene));
  eleventyConfig.addFilter("paroleKlasse", (p = "") => {
    const t = p.toUpperCase();
    if (t.includes("/")) return "parole-mix";
    if (t.startsWith("JA")) return "parole-ja";
    if (t.startsWith("NEIN")) return "parole-nein";
    return "parole-frei";
  });

  const publiziert = (item) => item.data.veroeffentlicht !== false;

  // News: neueste zuerst
  eleventyConfig.addCollection("news", (api) =>
    api.getFilteredByGlob("src/news/*.md").filter(publiziert).sort((a, b) => b.date - a.date)
  );
  // Termine: nur kommende, nächster zuerst (Vergangene blendet zusätzlich ein kleines Script im Browser aus)
  eleventyConfig.addCollection("termineKommend", (api) =>
    api.getFilteredByGlob("src/termine/*.md").filter(publiziert)
      .filter((t) => t.date >= heute())
      .sort((a, b) => a.date - b.date)
  );
  eleventyConfig.addCollection("termineVergangen", (api) =>
    api.getFilteredByGlob("src/termine/*.md").filter(publiziert)
      .filter((t) => t.date < heute())
      .sort((a, b) => b.date - a.date)
  );
  // Parolen: neueste Abstimmung zuerst
  eleventyConfig.addCollection("parolen", (api) =>
    api.getFilteredByGlob("src/parolen/*.md").filter(publiziert).sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
