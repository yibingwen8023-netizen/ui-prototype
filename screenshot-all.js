const { chromium } = require('playwright');
const path = require('path');

const pages = [
  { file: 'yinsheng-prototype-index.html', name: '01-流程总览' },
  { file: 'yinsheng-wallet-login.html', name: '02-登录页' },
  { file: 'yinsheng-onboarding-apply.html', name: '03-入驻申请' },
  { file: 'yinsheng-signing-processing.html', name: '04-银盛审核' },
  { file: 'yinsheng-signing-confirm.html', name: '05-签约确认' },
  { file: 'yinsheng-audit-failed.html', name: '06-审核失败-有按钮' },
  { file: 'yinsheng-audit-rejected.html', name: '06-审核不通过-无按钮' },
  { file: 'yinsheng-bind-bank.html', name: '07-绑定银行卡' },
  { file: 'yinsheng-verify-phone.html', name: '08-安全设置-验证手机' },
  { file: 'yinsheng-set-password.html', name: '09-安全设置-设置密码' },
  { file: 'yinsheng-onboarding-success.html', name: '10-入驻成功' }
];

const downloadDir = '/Users/mac/Downloads/yinsheng-screenshots-iphone16';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,  // iPhone 16 的 3x 屏幕
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
  });
  
  for (const pageInfo of pages) {
    const page = await context.newPage();
    const filePath = `file:///Users/mac/WorkBuddy/20260327091403/${pageInfo.file}`;
    
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // 等待页面完全渲染
    
    const screenshotPath = path.join(downloadDir, `${pageInfo.name}.png`);
    
    // 获取页面实际内容高度
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    const screenshotHeight = Math.min(bodyHeight, 844);
    
    await page.screenshot({ 
      path: screenshotPath, 
      clip: { x: 0, y: 0, width: 390, height: screenshotHeight }
    });
    
    console.log(`✓ 已截图: ${pageInfo.name}`);
    await page.close();
  }
  
  await browser.close();
  console.log('\n所有截图已完成！保存位置: ' + downloadDir);
})();
