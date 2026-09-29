import puppeteer from "puppeteer-core";

const VIEWPORTS = [
  { name: "Mobile Narrow (iPhone SE 1st gen)", width: 320, height: 568 },
  { name: "Mobile Android Standard", width: 360, height: 800 },
  { name: "Mobile iPhone SE / 8", width: 375, height: 667 },
  { name: "Mobile iPhone 12/13/14", width: 390, height: 844 },
  { name: "Mobile Large (iPhone Pro Max)", width: 430, height: 932 },
  { name: "Tablet Portrait (iPad Mini/Air)", width: 768, height: 1024 },
  { name: "Tablet Landscape / Small Laptop", width: 1024, height: 768 },
  { name: "Laptop Notebook (1366x768)", width: 1366, height: 768 },
  { name: "Desktop Standard (1440x900)", width: 1440, height: 900 },
  { name: "Desktop Large FHD (1920x1080)", width: 1920, height: 1080 },
];

async function audit() {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const page = await browser.newPage();
  const consoleErrors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.toString());
  });

  console.log("=== STARTING COMPREHENSIVE RESPONSIVE AUDIT ===");

  const results: Array<{
    name: string;
    width: number;
    height: number;
    hasOverflow: boolean;
    scrollWidth: number;
    headerCollision: boolean;
  }> = [];

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    const metrics = await page.evaluate(() => {
      const docEl = document.documentElement;
      const scrollW = docEl.scrollWidth;
      const clientW = docEl.clientWidth;
      const hasHorizontalScroll = scrollW > clientW + 1; // 1px threshold for fractional subpixel

      // Check header collision
      const header = document.querySelector("header");
      let headerCollided = false;
      if (header) {
        const logo = header.querySelector("a:first-of-type");
        const cta = header.querySelector("a:last-of-type");
        if (logo && cta) {
          const logoRect = logo.getBoundingClientRect();
          const ctaRect = cta.getBoundingClientRect();
          // Check if they collide or overlap
          headerCollided = logoRect.right > ctaRect.left;
        }
      }

      return {
        scrollW,
        clientW,
        hasHorizontalScroll,
        headerCollided,
      };
    });

    results.push({
      name: vp.name,
      width: vp.width,
      height: vp.height,
      hasOverflow: metrics.hasHorizontalScroll,
      scrollWidth: metrics.scrollW,
      headerCollision: metrics.headerCollided,
    });
  }

  console.log("Results Summary:");
  console.table(results);

  if (consoleErrors.length > 0) {
    console.error("Console Errors detected:", consoleErrors);
  } else {
    console.log("Zero console errors detected across all viewports!");
  }

  await browser.close();
}

audit().catch(console.error);
