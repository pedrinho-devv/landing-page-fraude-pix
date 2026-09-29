import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

async function run() {
  const screenshotsDir = path.join(process.cwd(), "public", "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Helper function to scroll through page and lock in animations
  async function scrollAndCapture(name: string, width: number, height: number, isMobile = false) {
    console.log(`Capturing ${name} (${width}x${height})...`);
    await page.setViewport({ width, height, isMobile, hasTouch: isMobile });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let currentPosition = 0;
        const step = 250;
        const timer = setInterval(() => {
          const maxScroll = document.body.scrollHeight;
          window.scrollBy(0, step);
          currentPosition += step;

          if (currentPosition >= maxScroll + 500) {
            clearInterval(timer);
            resolve();
          }
        }, 70);
      });
    });

    await new Promise((r) => setTimeout(r, 1000));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));

    const filePath = path.join(screenshotsDir, `${name}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Saved: ${filePath}`);
  }

  // 1. Desktop Standard
  await scrollAndCapture("desktop_full", 1280, 900, false);

  // 2. Tablet Portrait (iPad Air / Mini)
  await scrollAndCapture("tablet_full", 768, 1024, true);

  // 3. Mobile Standard (iPhone 14/15)
  await scrollAndCapture("mobile_full", 390, 844, true);

  // 4. Mobile Narrow (iPhone SE 1st gen - 320px)
  await scrollAndCapture("mobile_320_full", 320, 568, true);

  // 5. Test form submission viewport
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    const el = document.getElementById("analise");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 600));

  const desktopFormPath = path.join(screenshotsDir, "desktop_form.png");
  await page.screenshot({ path: desktopFormPath });

  await page.type("#fullName", "Dr. Roberto Magalhães");
  await page.type("#companyName", "Magalhães & Filhos Comércio Ltda");
  await page.type("#phone", "(11) 98765-4321");
  await page.type("#email", "roberto@magalhaesfilhos.com.br");
  await page.select("#companyRole", "Sócio(a) / proprietário(a)");
  await page.select("#lossRange", "De R$ 30 mil a menos de R$ 100 mil");
  await page.select("#bankContacted", "Sim, aguarda resposta");

  await page.click('button[type="submit"]');

  await page.waitForSelector('[role="alert"]', { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 500));

  const formSuccessPath = path.join(screenshotsDir, "form_success.png");
  await page.screenshot({ path: formSuccessPath });

  await browser.close();
  console.log("All device captures completed successfully!");
}

run().catch((err) => {
  console.error("Capture script failed:", err);
  process.exit(1);
});
