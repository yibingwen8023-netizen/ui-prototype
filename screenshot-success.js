const { chromium } = require('playwright');
const path = require('path');

const downloadDir = '/Users/mac/Downloads/yinsheng-screenshots-iphone16';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();
  const filePath = 'file:///Users/mac/WorkBuddy/20260327091403/yinsheng-onboarding-success.html';

  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const screenshotPath = path.join(downloadDir, '10-入驻成功.png');

  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  const screenshotHeight = Math.min(bodyHeight, 844);

  await page.screenshot({
    path: screenshotPath,
    clip: { x: 0, y: 0, width: 390, height: screenshotHeight }
  });

  console.log('已截图: 10-入驻成功.png');
  await page.close();
  await browser.close();
})();
