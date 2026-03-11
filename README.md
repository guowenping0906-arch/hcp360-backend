# HCP360 Backend - 医药营销智能平台

<div align="center">

**医药营销智能平台 - 后端服务**

[![GitHub](https://img.shields.io/github/license/guowenping0906-arch/hcp360-backend)](https://github.com/guowenping0906-arch/hcp360-backend)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-green?logo=prisma)](https://www.prisma.io/)

</div>

---

## 📖 项目简介

HCP360 是一个面向医药行业的智能营销平台，帮助医药代表更好地理解医生需求，提供个性化的学术推广方案。

### 核心功能

- **👨‍⚕️ 医生画像** - 完整的医生信息管理，包括基本信息、认知层级、障碍点等
- **🎯 NBA 推荐** - Next Best Action 智能推荐引擎，基于医生特征生成个性化建议
- **📊 品牌策略** - 品牌策略配置与管理，支持多维度策略映射
- **🔍 障碍点分析** - 医生观念障碍点识别与分级，支持交叉障碍点
- **💬 反馈收集** - 拜访反馈收集与分析，持续优化推广策略

### 技术特点

- **认知层级模型** - 4 级医生观念阶梯（传统型 → 生物制剂型 → EOS 型 → 精准靶向型）
- **智能推荐算法** - 基于障碍点的 NBA 推荐引擎
- **灵活的数据模型** - Prisma ORM + PostgreSQL

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | NestJS 10 |
| **语言** | TypeScript 5 |
| **ORM** | Prisma 5 |
| **数据库** | PostgreSQL |
| **验证** | class-validator, class-transformer |
| **API 文档** | Swagger/OpenAPI |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9
- PostgreSQL >= 14

### 安装依赖

```bash
npm install
```

### 配置数据库

1. 复制环境变量文件
```bash
cp .env.example .env
```

2. 修改 `.env` 中的数据库连接配置
```env
DATABASE_URL="postgresql://user:password@localhost:5432/hcp360?schema=public"
```

3. 执行数据库迁移
```bash
npx prisma migrate dev
npx prisma generate
```

### 启动开发服务器

```bash
npm run start:dev
```

API 将运行在：http://localhost:3000

### 访问 API 文档

启动后访问：http://localhost:3000/api/docs

---

## 📁 项目结构

```
src/
├── app.module.ts          # 应用主模块
├── main.ts                # 应用入口
├── database/              # 数据库模块
│   ├── database.module.ts
│   ├── database.service.ts
│   └── mock-database.service.ts
├── hcp/                   # 医生管理模块
│   ├── hcp.controller.ts
│   ├── hcp.service.ts
│   ├── hcp.module.ts
│   ├── dto/hcp.dto.ts
│   └── entities/
├── barrier/               # 障碍点模块
│   ├── barrier.controller.ts
│   ├── barrier.service.ts
│   ├── barrier.module.ts
│   ├── dto/
│   └── entities/
├── nba/                   # NBA 推荐模块
│   ├── nba.controller.ts
│   ├── nba.service.ts
│   ├── nba.module.ts
│   ├── dto/
│   └── entities/
├── brand-strategy/        # 品牌策略模块
│   ├── brand-strategy.controller.ts
│   ├── brand-strategy.service.ts
│   ├── brand-strategy.module.ts
│   ├── dto/
│   └── entities/
└── feedback/              # 反馈模块
    ├── feedback.controller.ts
    ├── feedback.service.ts
    ├── feedback.module.ts
    ├── dto/
    └── entities/
```

---

## 📡 API 接口

### 医生管理 (HCP)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/hcp` | 获取医生列表 |
| GET | `/api/hcp/:id` | 获取医生详情 |
| POST | `/api/hcp` | 创建医生 |
| PUT | `/api/hcp/:id` | 更新医生 |
| DELETE | `/api/hcp/:id` | 删除医生 |

### 障碍点 (Barrier)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/barrier` | 获取障碍点列表 |
| GET | `/api/barrier/dictionary` | 获取障碍点词典 |
| POST | `/api/barrier/mapping` | 创建医生 - 障碍点映射 |

### NBA 推荐

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/nba/:hcpId` | 获取医生 NBA 推荐 |
| POST | `/api/nba/generate` | 生成 NBA 推荐 |

### 品牌策略

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/strategy` | 获取策略列表 |
| GET | `/api/strategy/:id` | 获取策略详情 |
| POST | `/api/strategy` | 创建策略 |

### 反馈

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/feedback` | 获取反馈列表 |
| POST | `/api/feedback` | 提交反馈 |

---

## 🧪 测试

```bash
# 单元测试
npm run test

# 测试覆盖率
npm run test:cov

# E2E 测试
npm run test:e2e
```

---

## 📦 部署

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm run start:prod
```

### Docker 部署（待配置）

```bash
docker build -t hcp360-backend .
docker run -p 3000:3000 hcp360-backend
```

---

## 🔧 开发指南

### 创建新模块

```bash
nest g module new-module
nest g controller new-module
nest g service new-module
```

### 代码规范

- 遵循 TypeScript 严格模式
- 使用 ESLint + Prettier
- 提交前运行测试

### Git 工作流

```bash
# 创建功能分支
git checkout -b feature/your-feature

# 开发完成后创建 PR
gh pr create --title "feat: your feature" --base master
```

---

## 📝 更新日志

### v1.0.0 (2026-03-11)
- ✨ 初始版本
- 👨‍⚕️ 医生管理模块
- 🎯 NBA 推荐引擎
- 📊 品牌策略模块
- 🔍 障碍点分析
- 💬 反馈收集

---

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 👥 团队

- **开发者**: guowenping0906-arch
- **项目启动**: 2026-02-28
- **当前版本**: 1.0.0

---

## 📞 联系方式

如有问题或建议，请通过 GitHub Issues 联系我们。

---

<div align="center">

**Made with ❤️ using NestJS**

[⭐ Star this repo](https://github.com/guowenping0906-arch/hcp360-backend) if you find it helpful!

</div>
