# 贡献指南

感谢你对本项目的关注！欢迎贡献代码、报告问题或提出建议。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)

---

## 行为准则

请尊重所有贡献者和用户，保持友好和专业的沟通。

---

## 如何贡献

### 报告问题

发现 bug 或有功能建议？请创建 [Issue](https://github.com/guowenping0906-arch/hcp360-backend/issues)。

**报告 bug 时请提供**:
- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息（Node.js 版本、操作系统等）

**提出功能建议时请提供**:
- 功能描述
- 使用场景
- 预期效果

### 提交代码

1. Fork 本仓库
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

---

## 开发环境设置

### 前置要求

- Node.js >= 18
- npm >= 9
- PostgreSQL >= 14

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/guowenping0906-arch/hcp360-backend.git
cd hcp360-backend

# 安装依赖
npm install

# 配置数据库
cp .env.example .env
# 编辑 .env 设置数据库连接

# 执行迁移
npx prisma migrate dev
npx prisma generate

# 启动开发服务器
npm run start:dev
```

---

## 代码规范

### TypeScript

- 使用严格模式
- 定义明确的类型
- 避免使用 `any`

### NestJS

- 遵循模块化原则
- 使用依赖注入
- 合理使用装饰器

### 代码风格

- 使用 Prettier 格式化代码
- 遵循 ESLint 规则
- 函数不超过 50 行
- 文件不超过 500 行

### 测试

- 核心功能必须编写单元测试
- 目标覆盖率：60%+
- 使用 Jest 测试框架

---

## 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构（既不是新功能也不是 bug 修复）
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

### 示例

```
feat(hcp): 添加医生信息查询接口

- 实现 GET /api/hcp/:id 接口
- 添加数据验证
- 编写单元测试

Closes #1
```

```
fix(barrier): 修复障碍点映射查询错误

- 修复关联查询条件
- 添加边界测试

Fixes #5
```

---

## Pull Request 流程

### 创建 PR

1. 确保代码通过所有测试
2. 更新文档（如需要）
3. 创建 Pull Request
4. 填写 PR 描述模板

### PR 描述模板

```markdown
## 描述
简要描述此 PR 的目的

## 相关 Issue
Closes #issue_number

## 更改类型
- [ ] 新功能 (feat)
- [ ] Bug 修复 (fix)
- [ ] 文档更新 (docs)
- [ ] 重构 (refactor)
- [ ] 测试 (test)
- [ ] 其他 (chore)

## 测试
- [ ] 已添加单元测试
- [ ] 已手动测试
- [ ] 测试通过

## 截图（如适用）
添加相关截图

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已添加必要的注释
- [ ] 文档已更新
- [ ] 无 ESLint 警告
```

### 审查流程

1. 项目维护者会审查代码
2. 可能需要修改
3. 审查通过后合并
4. 关闭 PR

---

## 代码审查标准

- 代码质量
- 测试覆盖率
- 文档完整性
- 性能影响
- 安全性

---

## 常见问题

### Q: 如何同步上游仓库？

```bash
git remote add upstream https://github.com/guowenping0906-arch/hcp360-backend.git
git fetch upstream
git merge upstream/master
```

### Q: 如何运行测试？

```bash
npm run test
npm run test:cov  # 查看覆盖率
```

### Q: 如何调试？

使用 VSCode 调试配置或添加断点：

```typescript
debugger; // 断点
```

---

## 联系方式

- GitHub Issues: https://github.com/guowenping0906-arch/hcp360-backend/issues
- Email: (待添加)

---

感谢你的贡献！🎉
