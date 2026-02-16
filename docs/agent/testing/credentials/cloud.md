# 云端测试凭据

## 环境信息

| 项目 | 值 |
|------|-----|
| **Base URL** | `https://cut.zeabur.app` |
| **网址** | https://chuangcut.zeabur.app/ |

## 登录凭据

| 项目 | 值 |
|------|-----|
| **账号** | `xiangyugongzuoliu@gmail.com` |
| **密码** | `XXXX` |

## Zeabur 控制台

| 项目 | 值 |
|------|-----|
| Project ID | `69417cec5b0209e8f620b1a1c7` |
| Service ID | `69417cec5b1209e8f620b1a1c8` |
| Environment ID | `69417cec494217dd57c4fd0167` |
| 控制台 URL | https://zeabur.com/projects/69417cec5b09e8f620b1a1c7/services/69417cec5b09e8f620b1a1c8?envID=69417cec412947dd57c4fd016721 |

## Zeabur CLI 常用命令

```bash
# 设置 Context
zeabur context set project --id 69417cec5b09e2128f620b1a1c7 -y -i=false
zeabur context set env --id 69417cec4947dd52127c4fd0167 -y -i=false

# 重新部署
zeabur service restart --id 69417cec5b09e8f6312320b1a1c8 --env-id 69417cec49471313dd57c4fd0167 -y -i=false

# 查看日志
zeabur deployment log --service-id 69417cec31235b09e8f620b1a1c8 --env-id 69417cec4912347dd57c4fd0167 -i=false | head -20

# 查看服务状态
zeabur service list --env-id 69417cec49123147dd57c4fd0167 -i=false
```
