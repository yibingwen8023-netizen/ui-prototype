const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outputDir = '/Users/mac/Downloads/yinsheng-assets';

// 创建输出目录
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  // 1. 导出背景渐变
  console.log('导出背景...');
  const bgPage = await context.newPage();
  await bgPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; }
        .bg-blue { width: 390px; height: 844px; background: linear-gradient(160deg, #EEF3FF 0%, #F2F3F5 55%, #FFFFFF 100%); }
        .bg-red { width: 390px; height: 844px; background: linear-gradient(160deg, #FFF5F5 0%, #F2F3F5 55%, #FFFFFF 100%); }
        .bg-green { width: 390px; height: 844px; background: linear-gradient(160deg, #E8FFEA 0%, #F0FFF4 40%, #F2F3F5 100%); }
      </style>
    </head>
    <body>
      <div class="bg-blue"></div>
    </body>
    </html>
  `);
  await bgPage.waitForTimeout(500);
  await bgPage.screenshot({ path: path.join(outputDir, 'bg-blue.png') });
  
  await bgPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; }
        .bg-red { width: 390px; height: 844px; background: linear-gradient(160deg, #FFF5F5 0%, #F2F3F5 55%, #FFFFFF 100%); }
      </style>
    </head>
    <body>
      <div class="bg-red"></div>
    </body>
    </html>
  `);
  await bgPage.waitForTimeout(500);
  await bgPage.screenshot({ path: path.join(outputDir, 'bg-red.png') });
  
  await bgPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; }
        .bg-green { width: 390px; height: 844px; background: linear-gradient(160deg, #E8FFEA 0%, #F0FFF4 40%, #F2F3F5 100%); }
      </style>
    </head>
    <body>
      <div class="bg-green"></div>
    </body>
    </html>
  `);
  await bgPage.waitForTimeout(500);
  await bgPage.screenshot({ path: path.join(outputDir, 'bg-green.png') });
  await bgPage.close();
  console.log('✓ 背景导出完成');

  // 2. 导出图标
  console.log('导出图标...');
  const iconPage = await context.newPage();
  
  // 盾牌图标
  await iconPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; }
        .shield-container { position: relative; width: 120px; height: 120px; }
        .shield-pulse { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle, rgba(22,93,255,0.15) 0%, transparent 70%); animation: pulse 2s ease-out infinite; }
        .shield-pulse:nth-child(2) { animation-delay: 0.5s; }
        @keyframes pulse { 0% { transform: scale(0.7); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        .shield-inner { position: absolute; inset: 12px; border-radius: 50%; background: linear-gradient(135deg, #EEF3FF 0%, #D6E4FF 100%); display: flex; align-items: center; justify-content: center; }
        .shield-inner svg { width: 48px; height: 48px; color: #165DFF; }
      </style>
    </head>
    <body>
      <div class="shield-container">
        <div class="shield-pulse"></div>
        <div class="shield-pulse"></div>
        <div class="shield-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
      </div>
    </body>
    </html>
  `);
  await iconPage.waitForTimeout(1000);
  await iconPage.screenshot({ path: path.join(outputDir, 'icon-shield.png') });
  
  // 成功图标
  await iconPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; }
        .success-container { position: relative; width: 120px; height: 120px; }
        .success-pulse { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle, rgba(0,180,42,0.12) 0%, transparent 70%); animation: pulse 2s ease-out infinite; }
        .success-pulse:nth-child(2) { animation-delay: 0.5s; }
        @keyframes pulse { 0% { transform: scale(0.7); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        .success-inner { position: absolute; inset: 10px; border-radius: 50%; background: linear-gradient(135deg, #00B42A, #00D42A); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(0,180,42,0.4); }
        .success-inner svg { width: 56px; height: 56px; color: white; }
      </style>
    </head>
    <body>
      <div class="success-container">
        <div class="success-pulse"></div>
        <div class="success-pulse"></div>
        <div class="success-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
    </body>
    </html>
  `);
  await iconPage.waitForTimeout(1000);
  await iconPage.screenshot({ path: path.join(outputDir, 'icon-success.png') });
  
  // 失败图标
  await iconPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; }
        .fail-container { position: relative; width: 120px; height: 120px; }
        .fail-pulse { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle, rgba(245,63,63,0.12) 0%, transparent 70%); animation: pulse 2s ease-out infinite; }
        .fail-pulse:nth-child(2) { animation-delay: 0.5s; }
        @keyframes pulse { 0% { transform: scale(0.7); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        .fail-inner { position: absolute; inset: 10px; border-radius: 50%; background: linear-gradient(135deg, #F53F3F, #FF6B6B); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(245,63,63,0.4); }
        .fail-inner svg { width: 56px; height: 56px; color: white; }
      </style>
    </head>
    <body>
      <div class="fail-container">
        <div class="fail-pulse"></div>
        <div class="fail-pulse"></div>
        <div class="fail-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
      </div>
    </body>
    </html>
  `);
  await iconPage.waitForTimeout(1000);
  await iconPage.screenshot({ path: path.join(outputDir, 'icon-fail.png') });
  
  // 步骤图标 - 完成
  await iconPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; gap: 20px; }
        .step-done { width: 28px; height: 28px; border-radius: 50%; background: #165DFF; display: flex; align-items: center; justify-content: center; }
        .step-done svg { width: 16px; height: 16px; color: white; }
        .step-active { width: 28px; height: 28px; border-radius: 50%; background: #165DFF; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 600; font-family: -apple-system, sans-serif; }
        .step-pending { width: 28px; height: 28px; border-radius: 50%; background: #E5E6EB; display: flex; align-items: center; justify-content: center; color: #86909C; font-size: 14px; font-weight: 600; font-family: -apple-system, sans-serif; }
      </style>
    </head>
    <body>
      <div class="step-done">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="step-active">2</div>
      <div class="step-pending">3</div>
    </body>
    </html>
  `);
  await iconPage.waitForTimeout(500);
  await iconPage.screenshot({ path: path.join(outputDir, 'icon-steps.png') });
  
  await iconPage.close();
  console.log('✓ 图标导出完成');

  // 3. 导出按钮样式
  console.log('导出按钮...');
  const btnPage = await context.newPage();
  await btnPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f5; gap: 20px; padding: 40px; }
        .btn-primary { width: 280px; height: 48px; border: none; border-radius: 9999px; background: linear-gradient(90deg, #165DFF, #4080FF); color: #fff; font-size: 15px; font-weight: 600; display: flex; align-items: center; justify-content: center; font-family: -apple-system, sans-serif; box-shadow: 0 4px 12px rgba(22,93,255,0.3); }
        .btn-secondary { width: 280px; height: 48px; border: 1.5px solid #165DFF; border-radius: 9999px; background: transparent; color: #165DFF; font-size: 15px; font-weight: 600; display: flex; align-items: center; justify-content: center; font-family: -apple-system, sans-serif; }
        .btn-danger { width: 280px; height: 48px; border: none; border-radius: 9999px; background: linear-gradient(90deg, #F53F3F, #FF6B6B); color: #fff; font-size: 15px; font-weight: 600; display: flex; align-items: center; justify-content: center; font-family: -apple-system, sans-serif; box-shadow: 0 4px 12px rgba(245,63,63,0.3); }
      </style>
    </head>
    <body>
      <div class="btn-primary">主要按钮</div>
      <div class="btn-secondary">次要按钮</div>
      <div class="btn-danger">危险按钮</div>
    </body>
    </html>
  `);
  await btnPage.waitForTimeout(500);
  await btnPage.screenshot({ path: path.join(outputDir, 'buttons.png') });
  await btnPage.close();
  console.log('✓ 按钮导出完成');

  // 4. 导出卡片样式
  console.log('导出卡片...');
  const cardPage = await context.newPage();
  await cardPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f5; gap: 20px; padding: 40px; }
        .card { width: 320px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04); padding: 24px; font-family: -apple-system, sans-serif; }
        .card-title { font-size: 16px; font-weight: 600; color: #1D2129; margin-bottom: 12px; }
        .card-content { font-size: 14px; color: #4E5969; line-height: 1.6; }
        .card-error { width: 320px; background: #FFF0F0; border: 1px solid #FFD4D4; border-radius: 10px; padding: 16px; font-family: -apple-system, sans-serif; }
        .card-error-title { font-size: 14px; font-weight: 600; color: #F53F3F; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .card-error-content { font-size: 13px; color: #4E5969; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="card-title">普通卡片</div>
        <div class="card-content">这是卡片内容区域，用于展示一般信息。</div>
      </div>
      <div class="card-error">
        <div class="card-error-title">⚠ 错误提示</div>
        <div class="card-error-content">这是错误提示卡片，用于展示警告或错误信息。</div>
      </div>
    </body>
    </html>
  `);
  await cardPage.waitForTimeout(500);
  await cardPage.screenshot({ path: path.join(outputDir, 'cards.png') });
  await cardPage.close();
  console.log('✓ 卡片导出完成');

  await browser.close();
  
  // 列出所有导出的文件
  console.log('\n=== 导出完成 ===');
  const files = fs.readdirSync(outputDir);
  files.forEach(f => {
    const stat = fs.statSync(path.join(outputDir, f));
    console.log(`✓ ${f} (${(stat.size/1024).toFixed(1)} KB)`);
  });
})();
