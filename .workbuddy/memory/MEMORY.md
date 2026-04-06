# 工作记忆 MEMORY.md

## 项目管理体系（2026-03-26）
- 已建立标准化项目目录结构：projects/project-{序号}-{名称}/
- 包含：README.md、requirements.md、knowledge_base/、outputs/、configs/、scripts/、logs/
- 第一个项目：project-001-coze-sales-ai 已创建归档

## 银盛钱包 UI 系列页面设计（2026-03-27）
- 设计体系：主色 #165DFF，金融风格，卡片阴影，PingFang SC 字体族，设计令牌统一
- 总览导航：/Users/mac/WorkBuddy/20260327091403/yinsheng-prototype-index.html（12页面入口）
- **登录页**：yinsheng-wallet-login.html（手机号校验、SMS倒计时、演示码123456）
- **个人入驻流程**（6步）：填写资料→银盛审核→签约确认→绑定银行卡→安全设置→申请成功
  - 入驻申请页：yinsheng-onboarding-apply.html
  - 审核等待页：yinsheng-signing-processing.html
  - 签约确认页：yinsheng-signing-confirm.html
  - 绑定银行卡页：yinsheng-bind-bank.html
  - 安全设置：yinsheng-security-setup.html（合并页）
  - 入驻成功页：yinsheng-onboarding-success.html
- **商户入驻流程**（5步，2026-04-06新增）：登录→填写信息→银盛审核→签约→微信/支付宝认证
  - 账户类型选择页：yinsheng-account-type.html（个人/商户分流）
  - 填写信息页：yinsheng-merchant-apply.html（营业执照、法人身份证、对公账户）
  - 微信认证页：yinsheng-merchant-wechat.html（二维码扫码认证）
  - 支付宝认证页：yinsheng-merchant-alipay.html（二维码扫码认证）
- 本地服务器：http://localhost:7788

## 银盛钱包后台管理系统规划（2026-04-02 ~ 04-06）
- 需求文档：/Users/mac/WorkBuddy/20260327091403/docs/银盛钱包-商户入驻后台管理系统-需求文档.md（V1.2版本）
- 功能结构图：/Users/mac/WorkBuddy/20260327091403/docs/yinsheng-admin-structure.html（http://localhost:7790）
- 核心功能：①商户列表进展可视 ②一键生成继续入驻邀请链接（支持短信/复制）③代为入驻操作（后台直接帮商户完成）
- 模块：商户入驻（新增）、商户列表、商户详情、邀请继续入驻、审核管理、运营仪表盘
- 入驻来源标记：线上自申请 / 后台代录入
- 状态枚举：IN_PROGRESS / PENDING_AUDIT / AUDIT_FAILED / AUDIT_REJECTED / COMPLETED
- 代入驻功能：新增商户、代上传证件、代填写信息、代签约、代绑卡、代设置密码、批量导入Excel
- **新增：商户入驻流程区分**
  - 个人账户：6步流程（登录→填资料→审核→签约→绑卡→设密码）
  - 商户账户：5步流程（登录→填信息→审核→签约→微信/支付宝认证）
  - 入驻类型枚举：personal（个人）/ merchant（商户）
  - 商户特有字段：营业执照号/法人信息/对公账户/商户类型等

## Icon 切图导出（2026-03-31）
- 脚本：/Users/mac/WorkBuddy/20260327091403/export-icons.js
- 输出目录：/Users/mac/Downloads/yinsheng-icons/（共15个 PNG，透明背景，无白边，3x 高清）
- 包含：功能类（银行卡/手机/盾牌/验证通过/错误/编辑）、状态类大图（成功/失败/审核中）、步骤状态（完成/当前/待完成）、银行 Logo（工/招/农）
