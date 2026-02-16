# CLAUDE.md

## 项目简介

ChuangCut 是基于 Google Gemini AI 的全自动视频剪辑工具。

**核心能力**：视频智能分析 → 分镜脚本生成 → AI 配音合成 → 本地音画同步

**版本**：16.0.0

## 技术栈

- Next.js 16.0.6 + React 19.2 + TypeScript 5.9
- Tailwind CSS v4.1 + SQLite (better-sqlite3 12.5)
- Google Gemini (Vertex AI / AI Studio)
- FFmpeg 8.0.1 + Fish Audio

## 开发命令

```bash
./scripts/dev.sh          # 启动开发环境
./scripts/test.sh         # 统一测试入口
pnpm build                 # 开发构建
pnpm build:production      # 生产构建（带混淆）
pnpm lint && pnpm format   # 代码验证
pnpm test                  # 运行所有测试
```

## 关键约束

- 禁止 Server Actions，统一使用 API Routes
- 工作流核心：`lib/workflow/engine.ts`
- 代码验证：提交前运行 `pnpm lint`

## 按需参考文档

**开始任务前，请先阅读对应的 `docs/agent/` 文档**：

| 任务类型 | 参考文档 |
|---------|---------|
| 文档导航 | [docs/agent/index.md](docs/agent/index.md) |
| 理解项目架构 | [docs/agent/architecture.md](docs/agent/architecture.md) |
| 修改数据库 | [docs/agent/database.md](docs/agent/database.md) |
| 工作流相关 | [docs/agent/workflow.md](docs/agent/workflow.md) |
| 添加 API | [docs/agent/api-routes.md](docs/agent/api-routes.md) |
| AI 调用 | [docs/agent/ai-integration.md](docs/agent/ai-integration.md) |
| 重试机制 | [docs/agent/retry.md](docs/agent/retry.md) |
| 视频处理 | [docs/agent/video-processing.md](docs/agent/video-processing.md) |
| 工具函数 | [docs/agent/utils.md](docs/agent/utils.md) |
| 部署发布 | [docs/agent/deployment.md](docs/agent/deployment.md) |
| 测试账号 | [docs/agent/credentials.md](docs/agent/credentials.md) |
| 前端开发 | [docs/agent/frontend.md](docs/agent/frontend.md) |
| 风格系统 | [docs/agent/style-system.md](docs/agent/style-system.md) |
| 环境变量 | [docs/agent/env-vars.md](docs/agent/env-vars.md) |
| 问题排查 | [docs/agent/troubleshooting.md](docs/agent/troubleshooting.md) |
| 测试相关 | [docs/agent/testing/index.md](docs/agent/testing/index.md) |
| 版本历史 | [docs/agent/changelog.md](docs/agent/changelog.md) |

## 外部服务

- **Gemini**：Vertex AI（企业级）/ AI Studio（个人用户）
- **FFmpeg 8.0.1**：本地视频处理（拆条、拼接、调速、合成，零 API 费用）
- **Fish Audio**：AI 语音合成（高质量）
- **Edge TTS**：备选语音合成（快速、免费）
- **GCS**：最终成片存储（Vertex AI 模式）

## 注意事项

1. 永远使用简体中文进行沟通和文档编写
2. 所有 Run & Debug 操作通过 `scripts/` 目录下的 `.sh` 脚本执行
3. 数据结构使用强类型，避免 `any`
4. 禁止使用 CommonJS，只用 ES Modules
