import { Callout, CodeBlock, SectionCard } from '@/components/guide'
import { Badge } from '@/components/ui'

export function TroubleshootingTab() {
  return (
    <div className="space-y-6">
      {/* 说明提示 */}
      <Callout type="info" title="排查思路">
        遇到问题时，请先查看任务详情页的错误信息。大多数问题可以通过检查 API
        配置、视频文件格式、服务器资源来解决。如需进一步帮助，可借助 Claude Code
        根据源码和日志调试。
      </Callout>

      {/* 1. Gemini API 调用失败 */}
      <SectionCard title="1. Gemini API 调用失败" description="最常见的问题：API 权限或配额限制">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">问题描述</h4>
            <p className="text-sm text-claude-dark-600">
              2025 年 Google 更新政策，免费用户无法调用 <code>gemini-2.5-pro</code>{' '}
              模型。视频剪辑需要精确的时间戳分析，必须使用 Pro 模型才能保证质量。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">常见错误信息</h4>
            <CodeBlock
              language="bash"
              code={`# 频率限制
429 Too Many Requests
Resource exhausted: Quota exceeded

# 权限问题
401 Unauthorized
403 Forbidden
PERMISSION_DENIED: User does not have access to model

# 账户问题
billing account not active
API key not valid`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <div className="p-3 mb-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>重要区分</strong>：Google AI Studio 的「会员订阅」和「API
                调用结算」是两个独立的概念。即使你订阅了 AI Studio
                会员，也需要单独在谷歌云绑定信用卡才能调用 Pro 模型的 API。
              </p>
            </div>
            <ul className="text-sm text-claude-dark-600 space-y-2 list-disc list-inside">
              <li>
                <strong>绑定谷歌云结算账户（必须）</strong>：访问{' '}
                <a
                  href="https://console.cloud.google.com/billing"
                  className="text-claude-orange-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Cloud Console
                </a>{' '}
                绑定信用卡，开启按量付费。这是调用 Pro 模型 API 的前提条件
              </li>
              <li>
                <strong>检查 API 密钥</strong>：在「密钥设置」页面验证密钥是否正确配置
              </li>
              <li>
                <strong>等待配额重置</strong>：429 错误通常是临时的，系统会自动重试最多 60 次
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* 2. Flash 模型时间戳错误 */}
      <SectionCard title="2. Flash 模型时间戳错误" description="模型精度不足导致剪辑失败">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">问题描述</h4>
            <p className="text-sm text-claude-dark-600">
              <code>gemini-2.5-flash</code>{' '}
              模型返回的时间戳精度不足，可能导致视频片段裁剪失败或顺序错乱。这是模型能力的限制，非配置问题。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">常见错误信息</h4>
            <CodeBlock
              language="bash"
              code={`# 时间戳越界
Invalid start time: 125.5s exceeds video duration 120s

# 时间戳重叠
Overlapping timestamps detected in scene 3 and 4

# FFmpeg 裁剪失败
Error splitting segment: Invalid time range`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <ul className="text-sm text-claude-dark-600 space-y-2 list-disc list-inside">
              <li>
                <strong>使用 Pro 模型（推荐）</strong>：<code>gemini-2.5-pro</code>{' '}
                模型时间戳精度更高
              </li>
              <li>
                <strong>减少分镜数量</strong>：降低 <code>storyboard_count</code>
                ，减少时间戳出错概率
              </li>
              <li>
                <strong>手动调整分镜</strong>：在 Web 界面的分镜编辑器中手动修正问题时间戳
              </li>
              <li>
                <strong>重新创建任务</strong>：AI 分析结果有随机性，重试可能得到正确结果
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* 3. 服务器性能不足 */}
      <SectionCard title="3. 服务器性能不足" description="FFmpeg 处理需要足够的 CPU 和内存">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">问题描述</h4>
            <p className="text-sm text-claude-dark-600">
              FFmpeg 视频处理是 CPU
              密集型操作，需要足够的系统资源。资源不足会导致处理超时或进程被系统终止。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">系统配置参考</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-claude-cream-100">
                    <th className="border border-claude-cream-200 px-3 py-2 text-left">资源</th>
                    <th className="border border-claude-cream-200 px-3 py-2 text-left">翔宇配置</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-claude-cream-200 px-3 py-2">内存</td>
                    <td className="border border-claude-cream-200 px-3 py-2">
                      <Badge variant="success">8GB</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-claude-cream-200 px-3 py-2">CPU</td>
                    <td className="border border-claude-cream-200 px-3 py-2">
                      <Badge variant="success">4 核</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-claude-cream-200 px-3 py-2">磁盘空间</td>
                    <td className="border border-claude-cream-200 px-3 py-2">
                      <Badge variant="success">预留 10GB+</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-claude-dark-500 mt-2">
              以上为翔宇实际验证可用的配置，更低配置未经验证，请根据自己情况测试。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">常见错误信息</h4>
            <CodeBlock
              language="bash"
              code={`# 超时
FFmpeg process timed out after 600000ms

# 内存不足
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
JavaScript heap out of memory

# 进程被终止
SIGKILL: Process was killed by the system`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <ul className="text-sm text-claude-dark-600 space-y-2 list-disc list-inside">
              <li>
                <strong>增加服务器资源</strong>：升级到更高配置的服务器
              </li>
              <li>
                <strong>减少并发数</strong>：在「系统设置」页面将「系统并发数」调整为「1 并发」或「2
                并发」
              </li>
              <li>
                <strong>处理小视频</strong>：限制单个视频文件在 100MB 以内
              </li>
              <li>
                <strong>Docker 资源配置</strong>：修改 docker-compose.yml 中的资源限制
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* 4. 视频文件问题 */}
      <SectionCard title="4. 视频文件问题" description="格式不支持或文件过大">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">文件限制</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-claude-cream-50 border border-claude-cream-200">
                <span className="text-sm text-claude-dark-500">最大文件大小</span>
                <p className="font-semibold text-claude-dark-700">300MB</p>
              </div>
              <div className="p-3 rounded-lg bg-claude-cream-50 border border-claude-cream-200">
                <span className="text-sm text-claude-dark-500">支持格式</span>
                <p className="font-semibold text-claude-dark-700">MP4</p>
              </div>
            </div>
            <p className="text-xs text-claude-dark-500 mt-2">
              由于不同用户网络环境差异，上传大文件容易出现网络不稳定、断连等问题，导致任务失败。翔宇将限制设为
              300MB 以保证稳定性。如需处理更大文件，可本地部署后修改源码中的限制。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">常见错误信息</h4>
            <CodeBlock
              language="bash"
              code={`# 文件过大
Video file too large: 450MB exceeds limit of 300MB

# 格式不支持
Unsupported video format: .avi
Only MP4 format is supported

# 下载失败
Failed to download video: 404 Not Found
Failed to download video: Connection timeout`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <ul className="text-sm text-claude-dark-600 space-y-2 list-disc list-inside">
              <li>
                <strong>压缩视频</strong>：使用 FFmpeg 或 HandBrake 压缩到 300MB 以内
              </li>
              <li>
                <strong>转换格式</strong>：将 AVI、MOV 等格式转换为 MP4
              </li>
              <li>
                <strong>检查 URL</strong>：确保视频 URL 可公开访问，无需登录验证
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* 5. TTS 配音失败 */}
      <SectionCard title="5. TTS 配音失败" description="语音合成服务配置或调用问题">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">问题描述</h4>
            <p className="text-sm text-claude-dark-600">
              系统支持 Fish Audio（付费高质量）和 Edge TTS（免费）两种语音合成方案。配置错误或 API
              调用失败会导致配音步骤失败。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">常见错误信息</h4>
            <CodeBlock
              language="bash"
              code={`# 配置问题
Fish Audio credentials not configured
Fish Audio API Key is required

# Voice ID 问题
Voice ID not found: invalid-voice-id
Failed to verify voice: 404

# 生成失败
TTS generation timeout after 60s
Text too long for TTS synthesis`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <div className="p-3 mb-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>重要区分</strong>：Fish Audio 的「会员订阅」和「API
                调用」是两个独立的概念。需要在 API 调用页面单独充值，余额不足会导致调用失败。
              </p>
            </div>
            <ul className="text-sm text-claude-dark-600 space-y-2 list-disc list-inside">
              <li>
                <strong>充值 API 余额</strong>：在 Fish Audio 官网的 API 页面充值，确保余额充足
              </li>
              <li>
                <strong>检查 API Key</strong>：在「密钥设置」页面验证 Fish Audio API Key
              </li>
              <li>
                <strong>验证 Voice ID</strong>：确保 Voice ID 存在且账户有使用权限
              </li>
              <li>
                <strong>切换 Edge TTS</strong>：如 Fish Audio 不可用，可切换到免费的 Edge TTS
              </li>
              <li>
                <strong>缩短旁白长度</strong>：单条旁白过长可能导致超时，建议控制在 500 字以内
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* 6. GCS 存储问题 */}
      <SectionCard title="6. GCS 存储问题（Vertex AI 模式）" description="云存储配置或权限问题">
        <div className="p-3 rounded-lg bg-claude-cream-50 border border-claude-cream-200">
          <p className="text-sm text-claude-dark-600">
            翔宇基于 AI Studio 模式进行验证，Vertex AI 模式涉及 GCS
            存储配置，请根据自己情况自行验证和排查。
          </p>
        </div>
      </SectionCard>

      {/* 7. 数据库/磁盘空间问题 */}
      <SectionCard title="7. 数据库/磁盘空间问题" description="存储空间不足或数据库锁定">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">问题描述</h4>
            <p className="text-sm text-claude-dark-600">
              视频处理会产生大量临时文件（每个分镜约生成 3
              个中间文件），磁盘空间不足会导致任务失败。SQLite 数据库在并发写入时也可能出现锁定。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">常见错误信息</h4>
            <CodeBlock
              language="bash"
              code={`# 磁盘空间
ENOSPC: no space left on device
Disk full: cannot write to /tmp/chuangcut

# 数据库锁定
SQLITE_BUSY: database is locked
SQLITE_LOCKED: database table is locked`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <ul className="text-sm text-claude-dark-600 space-y-2 list-disc list-inside">
              <li>
                <strong>清理临时文件</strong>：删除 <code>/tmp/chuangcut</code> 下的过期文件
              </li>
              <li>
                <strong>使用存储清理功能</strong>：访问「系统设置」页面的存储管理功能
              </li>
              <li>
                <strong>增加磁盘空间</strong>：确保剩余空间大于视频大小的 3.2 倍
              </li>
              <li>
                <strong>重启应用</strong>：解决数据库锁定问题
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* 8. Windows 用户部署 */}
      <SectionCard title="8. Windows 用户本地部署" description="平台兼容性问题">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">问题描述</h4>
            <p className="text-sm text-claude-dark-600">
              本程序基于 Mac 平台开发，Windows 用户直接部署可能会遇到路径分隔符、Shell 脚本、FFmpeg
              调用等兼容性问题。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <p className="text-sm text-claude-dark-600">
              <strong>使用 WSL</strong>：Windows 用户建议开启 WSL（Windows Subsystem for Linux），在
              Linux 环境下运行程序，可获得与 Mac 类似的兼容性。
            </p>
          </div>
        </div>
      </SectionCard>

      {/* 9. Zeabur 部署兼容性 */}
      <SectionCard title="9. Zeabur 部署兼容性问题" description="版本更新后的兼容性">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">问题描述</h4>
            <p className="text-sm text-claude-dark-600">
              程序版本更新后，可能存在数据库结构、配置格式等变更，直接覆盖更新可能导致兼容性问题。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-claude-dark-700 mb-2">解决方案</h4>
            <p className="text-sm text-claude-dark-600">
              在 Zeabur 部署时，如遇到系统异常，建议删除旧项目后重新部署新版本，以避免兼容性问题。
            </p>
          </div>
        </div>
      </SectionCard>

      {/* 帮助提示 */}
      <Callout type="tip" title="说明">
        <p className="mb-2">
          由于程序选项繁杂，翔宇个人精力有限，程序可能存在 Bug 和疏漏，敬请谅解。
        </p>
        <p>
          本程序源代码已在 AI 实操课中提供，遇到问题可结合 Claude Code
          根据源码和错误日志自行调试修改。
        </p>
      </Callout>
    </div>
  )
}
