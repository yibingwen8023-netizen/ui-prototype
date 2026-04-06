const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outputDir = '/Users/mac/Downloads/yinsheng-icons';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// 所有需要导出的 icon 定义
const icons = [
  // ===== 功能类 Icon =====
  {
    name: 'icon-bank-card',
    label: '银行卡',
    size: 48,
    bg: '#FFF7E8',
    radius: 10,
    svg: `<svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke="#FF7D00" stroke-width="1.2"/>
      <path d="M1.5 7h15" stroke="#FF7D00" stroke-width="1.2"/>
      <rect x="3.5" y="10" width="4" height="2" rx="0.5" fill="#FF7D00"/>
    </svg>`
  },
  {
    name: 'icon-phone',
    label: '手机',
    size: 48,
    bg: '#EEF3FF',
    radius: 10,
    svg: `<svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="1" width="10" height="16" rx="2" stroke="#165DFF" stroke-width="1.2"/>
      <circle cx="9" cy="14" r="1" fill="#165DFF"/>
      <path d="M6 4h6" stroke="#165DFF" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`
  },
  {
    name: 'icon-shield-check',
    label: '安全盾牌',
    size: 48,
    bg: '#EEF3FF',
    radius: 24,
    svg: `<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5L2.5 4v4.5c0 2.5 1.75 4.8 4 5.5 2.25-.7 4-3 4-5.5V4L8 1.5z" fill="#165DFF" opacity="0.15" stroke="#165DFF" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M5.5 8l2 2 3-3" stroke="#165DFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    name: 'icon-check-circle',
    label: '验证通过',
    size: 48,
    bg: '#E8FFEA',
    radius: 24,
    svg: `<svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6.5" fill="#E8FFEA" stroke="#00B42A"/>
      <path d="M4 7l2 2 4-4" stroke="#00B42A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    name: 'icon-error-circle',
    label: '错误圆圈',
    size: 48,
    bg: 'transparent',
    radius: 0,
    svg: `<svg width="24" height="24" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5.5" stroke="#F53F3F"/>
      <path d="M6 3.5v3M6 8.5h.01" stroke="#F53F3F" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`
  },
  {
    name: 'icon-edit',
    label: '编辑',
    size: 48,
    bg: 'transparent',
    radius: 0,
    svg: `<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 3.5l2 2L6 16l-2.5.5.5-2.5L14.5 3.5z" stroke="#165DFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // ===== 状态类 Icon（大尺寸）=====
  {
    name: 'icon-success-large',
    label: '入驻成功',
    size: 80,
    bg: 'transparent',
    radius: 40,
    renderHtml: `
      <div style="position:relative;width:80px;height:80px;">
        <div style="position:absolute;inset:-10px;border-radius:50%;background:radial-gradient(circle,rgba(0,180,42,0.12) 0%,transparent 70%);"></div>
        <div style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,#00B42A,#00D42A);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,180,42,0.4);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
    `
  },
  {
    name: 'icon-fail-large',
    label: '审核失败',
    size: 80,
    bg: 'transparent',
    radius: 40,
    renderHtml: `
      <div style="position:relative;width:80px;height:80px;">
        <div style="position:absolute;inset:-10px;border-radius:50%;background:radial-gradient(circle,rgba(245,63,63,0.12) 0%,transparent 70%);"></div>
        <div style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,#F53F3F,#FF6B6B);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(245,63,63,0.4);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
      </div>
    `
  },
  {
    name: 'icon-pending-large',
    label: '审核中',
    size: 80,
    bg: 'transparent',
    radius: 40,
    renderHtml: `
      <div style="position:relative;width:80px;height:80px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,#EEF3FF,#D6E4FF);display:flex;align-items:center;justify-content:center;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#165DFF" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M12 8v4l2 2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    `
  },

  // ===== 步骤状态 =====
  {
    name: 'step-done',
    label: '步骤-已完成',
    size: 28,
    bg: 'transparent',
    radius: 0,
    renderHtml: `
      <div style="width:28px;height:28px;border-radius:50%;background:#165DFF;display:flex;align-items:center;justify-content:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    `
  },
  {
    name: 'step-active',
    label: '步骤-当前',
    size: 28,
    bg: 'transparent',
    radius: 0,
    renderHtml: `
      <div style="width:28px;height:28px;border-radius:50%;background:#165DFF;display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:600;font-family:-apple-system,PingFang SC,sans-serif;">4</div>
    `
  },
  {
    name: 'step-pending',
    label: '步骤-待完成',
    size: 28,
    bg: 'transparent',
    radius: 0,
    renderHtml: `
      <div style="width:28px;height:28px;border-radius:50%;background:#E5E6EB;display:flex;align-items:center;justify-content:center;color:#86909C;font-size:13px;font-weight:600;font-family:-apple-system,PingFang SC,sans-serif;">5</div>
    `
  },

  // ===== 银行 Logo 系列 =====
  {
    name: 'bank-logo-icbc',
    label: '工商银行Logo',
    size: 40,
    bg: 'transparent',
    radius: 0,
    renderHtml: `
      <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#165DFF,#4080FF);display:flex;align-items:center;justify-content:center;font-size:13px;color:white;font-weight:700;font-family:-apple-system,PingFang SC,sans-serif;">工</div>
    `
  },
  {
    name: 'bank-logo-cmb',
    label: '招商银行Logo',
    size: 40,
    bg: 'transparent',
    radius: 0,
    renderHtml: `
      <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#CC0000,#FF3333);display:flex;align-items:center;justify-content:center;font-size:13px;color:white;font-weight:700;font-family:-apple-system,PingFang SC,sans-serif;">招</div>
    `
  },
  {
    name: 'bank-logo-abc',
    label: '农业银行Logo',
    size: 40,
    bg: 'transparent',
    radius: 0,
    renderHtml: `
      <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#009933,#33CC66);display:flex;align-items:center;justify-content:center;font-size:13px;color:white;font-weight:700;font-family:-apple-system,PingFang SC,sans-serif;">农</div>
    `
  },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 200, height: 200 },
    deviceScaleFactor: 3  // 3x 高清输出
  });

  let successCount = 0;

  for (const icon of icons) {
    const page = await context.newPage();
    
    // 渲染内容
    const content = icon.renderHtml
      ? icon.renderHtml
      : `
        <div style="
          width:${icon.size}px;
          height:${icon.size}px;
          ${icon.bg && icon.bg !== 'transparent' ? `background:${icon.bg};` : ''}
          ${icon.radius ? `border-radius:${icon.radius}px;` : ''}
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          ${icon.svg}
        </div>
      `;

    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { 
            background: transparent !important; 
            width: ${icon.size}px; 
            height: ${icon.size}px;
            overflow: hidden;
          }
          body {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `);

    await page.waitForTimeout(300);

    // 精确截图，clip 到 icon 尺寸，无白边
    const outputPath = path.join(outputDir, `${icon.name}.png`);
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: icon.size, height: icon.size },
      omitBackground: true  // 透明背景
    });

    await page.close();
    successCount++;
    console.log(`✓ ${icon.name}.png  (${icon.label})`);
  }

  await browser.close();

  console.log(`\n=== 导出完成：${successCount} 个 icon ===`);
  console.log(`📁 输出目录：${outputDir}`);
  const files = fs.readdirSync(outputDir);
  const totalSize = files.reduce((sum, f) => {
    return sum + fs.statSync(path.join(outputDir, f)).size;
  }, 0);
  console.log(`📦 总大小：${(totalSize / 1024).toFixed(1)} KB`);
})();
