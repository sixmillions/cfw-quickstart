# 说明

还是用的 `cf-01-hello` 的 `wrangler.tom`配置文件，所以这个项目发布会覆盖Cloudflare上的 `cd-01-hello`

# 命令

```bash
# 查看版本
wrangler -v

# 登录worker
wrangler login

# 创建项目
wrangler init cfw-demo-01

# 本地运行
npm i
wrangler dev -l

# 发布
wrangler publish
```

# 处理请求得写法

hono提供的处理方式

```js
handleEvent: (event: FetchEvent) => Response | Promise<Response>;
fetch: (request: Request, Env?: E['Bindings'] | {}, executionCtx?: ExecutionContext) => Response | Promise<Response>;
request: (input: Request | string | URL, requestInit?: RequestInit) => Promise<Response>;
```

## 简单

```js
import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello World')) // http://localhost:8787
export default app
```

## 使用hono提供的处理方式

```js
handleEvent: (event: FetchEvent) => Response | Promise<Response>;
fetch: (request: Request, Env?: E['Bindings'] | {}, executionCtx?: ExecutionContext) => Response | Promise<Response>;
request: (input: Request | string | URL, requestInit?: RequestInit) => Promise<Response>;
```
