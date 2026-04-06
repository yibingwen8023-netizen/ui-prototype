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
  const filePath = `file:///Users/mac/WorkBuddy/20260327091403/yinsheng-bind-bank.html`;
  
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // 点击更换按钮打开弹窗
  await page.click('.phone-edit');
  await page.waitForTimeout(500);
  
  const screenshotPath = path.join(downloadDir, '07-绑定银行卡-更换手机号.png');
  
  await page.screenshot({ 
    path: screenshotPath, 
    fullPage: false
  });
  
  console.log(`✓ 已截图: 绑定银行卡-更换手机号弹窗`);
  
  await page.close();
  await browser.close();
  console.log('\n弹窗截图已完成！保存位置: ' + downloadDir);
})();
