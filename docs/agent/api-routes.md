# API 路由参考

## 任务管理（8 个端点）

### 任务 CRUD

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/jobs` | 任务列表（支持分页、筛选） |
| POST | `/api/jobs` | 创建任务 |
| GET | `/api/jobs/:id` | 任务详情（含 `state` 和 `stepHistory`） |
| DELETE | `/api/jobs/:id` | 删除任务 |

> 注：任务控制功能（stop）已在 v12.1.0 移除，任务失败需创建新任务重试

### 任务数据

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/jobs/:id/logs` | 任务日志 |
| GET | `/api/jobs/:id/cost` | 成本统计 |
| GET | `/api/jobs/:id/download` | 下载最终成片 |
| POST | `/api/jobs/validate` | 验证任务参数 |

## API 密钥（6 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/api-keys` | 获取所有密钥（脱敏） |
| POST | `/api/api-keys` | 保存密钥 |
| GET | `/api/api-keys/:service` | 获取指定服务密钥 |
| PUT | `/api/api-keys/:service` | 更新指定服务密钥 |
| DELETE | `/api/api-keys/:service` | 删除指定服务密钥 |
| POST | `/api/api-keys/verify` | 验证密钥有效性 |

## 风格管理（8 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/styles` | 风格列表 |
| POST | `/api/styles` | 创建自定义风格 |
| GET | `/api/styles/:id` | 风格详情 |
| PUT | `/api/styles/:id` | 更新风格 |
| DELETE | `/api/styles/:id` | 删除风格 |
| POST | `/api/styles/preview` | 风格预览（渲染提示词） |
| POST | `/api/styles/full-preview` | 完整预览（渲染完整提示词） |
| GET | `/api/styles/templates/:name` | 系统模板 |

## 鉴权系统（7 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| POST | `/api/auth/login` | 用户登录 |
| POST | `/api/auth/logout` | 用户登出 |
| POST | `/api/auth/register` | 用户注册 |
| GET | `/api/auth/status` | 认证状态 |
| GET | `/api/auth/tokens` | Token 列表 |
| POST | `/api/auth/tokens` | 创建 Token |
| DELETE | `/api/auth/tokens/:id` | 删除 Token |

## 系统配置（5 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/configs` | 获取全部配置 |
| POST | `/api/configs` | 批量保存配置 |
| GET | `/api/configs/:key` | 获取指定配置 |
| PUT | `/api/configs/:key` | 更新指定配置 |
| DELETE | `/api/configs/:key` | 删除指定配置 |

## 服务测试（3 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| POST | `/api/gemini/test` | 测试 Gemini 连接 |
| POST | `/api/gemini/models` | 获取模型列表 |
| POST | `/api/google-storage/test` | 测试 GCS 连接 |

## 存储管理（2 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/storage/stats` | 存储使用统计 |
| POST | `/api/storage/cleanup` | 清理临时文件 |

## TTS 语音合成（3 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/tts/voices` | 获取可用语音列表（支持多提供商） |
| GET | `/api/tts/status` | 检查 TTS 配置状态 |
| POST | `/api/tts/verify-voice` | 验证 Fish Audio voice_id 有效性 |

> **支持的 TTS 提供商**：
> - **Fish Audio**：高质量付费语音合成，需配置 API Key 和 Voice ID
> - **Edge TTS**：微软免费语音合成，无需配置

## 其他（4 个端点）

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/api/health` | 健康检查 |
| GET/POST | `/api/init` | 初始化检查 |
| POST | `/api/upload/video` | 视频上传 |
| POST | `/api/dev/clear-cache` | 清空缓存（开发调试） |

## 响应格式

### 成功响应

```json
{
  "success": true,
  "data": { ... }
}
```

### 错误响应

```json
{
  "success": false,
  "error": "错误信息"
}
```

### 任务详情响应

```json
{
  "job": {
    "id": "job_xxx",
    "status": "processing",
    "state": {
      "current_major_step": "process_scenes",
      "current_sub_step": "synthesize_audio",
      "total_scenes": 10,
      "processed_scenes": 3
    },
    "stepHistory": [
      {
        "major_step": "analysis",
        "sub_step": "fetch_metadata",
        "status": "completed",
        "started_at": 1234567890,
        "completed_at": 1234567900
      }
    ]
  }
}
```

## 废弃字段

- `job.checkpoint_data` - 已废弃，保留以支持旧任务
- 前端应优先使用 `job.state` 和 `job.stepHistory`

---

## API 调用示例

> 以下为任务创建和获取结果的核心 API 示例，仅供参考。如遇问题，可借助 Claude Code 根据源码调试解决。

### API 概览

- **Base URL**: `http://localhost:8899`
- **响应格式**: `application/json`
- **认证方式**: 如果系统启用了鉴权（AUTH_ENABLED=true），需要在请求头中携带 API Token（可在「密钥设置」页面生成）

### 创建任务 (POST /api/jobs)

**完整请求示例**

```bash
curl -X POST http://localhost:8899/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "input_videos": [
      {
        "url": "https://example.com/video.mp4",
        "label": "产品介绍视频",
        "title": "2025新品发布会",
        "description": "这是一段产品介绍视频，包含功能演示"
      }
    ],
    "style_id": "style-1000",
    "config": {
      "gemini_platform": "ai-studio",
      "storyboard_count": 6,
      "script_outline": "重点介绍产品的三大核心功能：便捷性、安全性、创新性",
      "original_audio_scene_count": 3,
      "bgm_url": "https://example.com/background-music.mp3",
      "max_concurrent_scenes": 3
    }
  }'
```

**多视频混剪示例**

```bash
curl -X POST http://localhost:8899/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "input_videos": [
      { "url": "https://example.com/video1.mp4", "label": "开场素材" },
      { "url": "https://example.com/video2.mp4", "label": "产品展示" },
      { "url": "https://example.com/video3.mp4", "label": "用户评价" }
    ],
    "style_id": "style-1001",
    "config": {
      "gemini_platform": "vertex",
      "storyboard_count": 6,
      "script_outline": "将三段素材整合为一个完整的产品宣传片"
    }
  }'
```

**参数说明**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `input_videos` | 数组 | 是 | 输入视频列表（1-5 个） |
| `input_videos[].url` | 字符串 | 是 | 视频 URL（http/https） |
| `input_videos[].label` | 字符串 | 否 | 视频标签（最多 50 字符） |
| `input_videos[].title` | 字符串 | 否 | 视频标题（最多 200 字符） |
| `input_videos[].description` | 字符串 | 否 | 视频描述（最多 500 字符） |
| `style_id` | 字符串 | 是 | 剪辑风格 ID |
| `config.gemini_platform` | 字符串 | 否 | AI 平台：`ai-studio` 或 `vertex` |
| `config.storyboard_count` | 整数 | 否 | 分镜数量（3-30，默认 6） |
| `config.script_outline` | 字符串 | 否 | 文案大纲（最多 5000 字） |
| `config.original_audio_scene_count` | 整数 | 否 | 保留原声的分镜数（默认 0） |
| `config.bgm_url` | 字符串 | 否 | 背景音乐 URL |
| `config.max_concurrent_scenes` | 整数 | 否 | 并发分镜数（1-5，默认 3） |

**响应示例**

```json
{
  "job_id": "job_abc123",
  "video_count": 1,
  "queue_status": {
    "running": 0,
    "max_concurrent": 1
  }
}
```

### 获取风格列表 (GET /api/styles)

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:8899/api/styles
```

**响应示例**

```json
{
  "builtin": [
    {
      "id": "style-1000",
      "name": "短视频复刻",
      "description": "多视频素材智能重塑",
      "is_builtin": true
    },
    {
      "id": "style-1001",
      "name": "通用解说",
      "description": "AI通用风格视频解说",
      "is_builtin": true
    }
  ],
  "custom": []
}
```

### 获取任务列表 (GET /api/jobs)

```bash
# 获取所有任务
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:8899/api/jobs

# 按状态筛选
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  "http://localhost:8899/api/jobs?status=completed"

# 分页查询
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  "http://localhost:8899/api/jobs?limit=10&offset=0"
```

**查询参数**

| 参数 | 说明 |
|------|------|
| `status` | 状态筛选：pending、processing、completed、failed |
| `limit` | 返回数量（1-100，默认 20） |
| `offset` | 偏移量（默认 0） |

### 获取任务详情 (GET /api/jobs/:id)

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:8899/api/jobs/job_abc123
```

**处理中响应示例**

```json
{
  "job": {
    "id": "job_abc123",
    "status": "processing",
    "stepHistory": [...],
    "state": {
      "current_step": "process_scenes",
      "current_sub_step": "scene_loop_start",
      "scenes_completed": 9,
      "scenes_total": 15
    }
  }
}
```

**已完成响应示例**

```json
{
  "job": {
    "id": "job_abc123",
    "status": "completed",
    "stepHistory": [...],
    "state": {
      "current_step": "compose",
      "current_sub_step": "upload_to_gcs"
    },
    "output_url": "https://storage.example.com/output/job_abc123.mp4",
    "local_path": "/output/job_abc123.mp4"
  }
}
```

### 健康检查 (GET /api/health)

```bash
curl http://localhost:8899/api/health
```

**响应示例**

```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00Z"
}
```
