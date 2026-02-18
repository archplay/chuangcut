
import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { logger } from './logger'

let isProxyConfigured = false

/**
 * 配置全局 HTTP/HTTPS 代理
 * 仅在 Node.js 环境下生效
 */
export function setupGlobalProxy() {
  if (isProxyConfigured) return

  let proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY
  if (!proxyUrl && process.env.NODE_ENV === 'development' && process.platform === 'darwin') {
    proxyUrl = 'http://127.0.0.1:7890'
    logger.info('[Proxy] 未检测到环境变量，开发环境默认使用本地 Clash 端口 7890')
  }

  if (proxyUrl) {
    try {
      logger.info(`[Proxy] 检测到代理配置: ${proxyUrl}`)
      
      const dispatcher = new ProxyAgent({
        uri: proxyUrl,
        // 增加连接超时设置，避免代理不稳定导致长时间挂起
        connect: {
          timeout: 30000,
        },
      })
      
      setGlobalDispatcher(dispatcher)
      
      // 增加全局 fetch 代理补丁（针对 Next.js 自带的 fetch）
      // @ts-ignore - 强制覆盖 fetch，Next.js 的 fetch 类型可能不兼容 undici dispatcher
      const originalFetch = globalThis.fetch
      // @ts-ignore
      globalThis.fetch = async (input, init) => {
        // @ts-ignore
        return originalFetch(input, {
          ...init,
          dispatcher,
        })
      }
      
      isProxyConfigured = true
      logger.info('[Proxy] 全局代理已启用 (undici + fetch patch)')
    } catch (error) {
      logger.error('[Proxy] 代理配置失败', error as Error)
    }
  }
}
