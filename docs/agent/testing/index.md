# 测试文档

## 测试凭据

> **安全提示**：凭据文件夹包含敏感信息，不要提交到公开仓库。删除此文件夹后，测试文档不含任何敏感信息。

| 文件 | 用途 |
|------|------|
| [credentials/cloud.md](credentials/cloud.md) | 云端测试环境凭据（Zeabur） |
| [credentials/local.md](credentials/local.md) | 本地开发环境凭据 |
| [credentials/shared.md](credentials/shared.md) | 共用资源（测试视频、API 配置模板） |

---

## 动态测试（功能测试）

运行时功能验证，包括云端和本地两套测试。

### 云端测试
| 文档 | 测试范围 |
|------|---------|
| [cloud-ui.md](dynamic/cloud-ui.md) | 界面渲染、登录流程、表单验证 |
| [cloud-workflow.md](dynamic/cloud-workflow.md) | 五阶段流水线执行 |
| [cloud-task-control.md](dynamic/cloud-task-control.md) | 任务控制（v12.1.0 已移除 stop 功能） |
| [cloud-api.md](dynamic/cloud-api.md) | API 端点功能验证 |
| [cloud-edge-cases.md](dynamic/cloud-edge-cases.md) | 错误处理、边界条件 |

### 本地测试
| 文档 | 测试范围 |
|------|---------|
| [local-ui.md](dynamic/local-ui.md) | 界面渲染、登录流程、表单验证 |
| [local-workflow.md](dynamic/local-workflow.md) | 五阶段流水线执行 |
| [local-task-control.md](dynamic/local-task-control.md) | 任务控制（v12.1.0 已移除 stop 功能） |
| [local-api.md](dynamic/local-api.md) | API 端点功能验证 |
| [local-edge-cases.md](dynamic/local-edge-cases.md) | 错误处理、边界条件 |

## 静态测试（代码分析）

代码质量和架构分析。

| 文档 | 分析范围 |
|------|---------|
| [workflow-engine.md](static/workflow-engine.md) | lib/workflow/ 模块 |
| [database-layer.md](static/database-layer.md) | lib/db/ 模块 |
| [ai-integration.md](static/ai-integration.md) | lib/ai/ 模块 |
| [auth-security.md](static/auth-security.md) | lib/auth/ 模块 |
| [api-routes.md](static/api-routes.md) | app/api/ 路由 |
| [frontend-components.md](static/frontend-components.md) | components/ 目录 |
| [utils.md](static/utils.md) | lib/utils/ 模块 |
| [type-system.md](static/type-system.md) | types/ 目录 |
| [config-style.md](static/config-style.md) | styles/ 目录 |
| [code-quality.md](static/code-quality.md) | 整体代码质量评估 |
