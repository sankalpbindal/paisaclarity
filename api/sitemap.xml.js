export default function handler(req, res) {
  const baseUrl = "https://paisaclarity.vercel.app";

  // 🔥 Add all your pages here (or generate dynamically)
  const pages = [
    "",
    "/pages/payslip.html",
    "/pages/itr.html",
    "/pages/emi.html",
    "/pages/invest.html",
    "/pages/ask.html",
    "/pages/pricing.html",
    "/pages/guide-new-vs-old-regime.html",
    "/pages/guide-80c-investments.html",
    "/pages/guide-hra-exemption.html",
    "/pages/guide-home-loan-tax-benefit.html",
    "/pages/guide-capital-gains-tax.html",
    "/pages/guide-form-26as.html",
    "/pages/guide-freelancer-tax-india.html",
    "/pages/guide-professional-tax.html"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page) => {
        return `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
        `;
      })
      .join("")}
  </urlset>`;

  // 🔥 CRITICAL HEADERS
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "no-store");

  res.status(200).send(sitemap);
}
