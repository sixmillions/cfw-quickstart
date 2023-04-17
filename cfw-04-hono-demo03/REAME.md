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

## 其他

只要给worker返回一个Response或者Promise即可

```js
export default {
  fetch (request, env, ctx) {
    return new Response("Hello World")
  }
}
```

# 引入honojs框架 实战

- 目标：颜色转换
- 例如：green -> #03f59d
- 依赖：hono + color-convert

具体api

- /hex/red -> #FF00000
- /rgb/blue -> (0,0,255)

示例：

- http://127.0.0.1:8787/hex/red
- http://127.0.0.1:8787/rgb/red
- http://127.0.0.1:8787/xxx/red
- http://127.0.0.1:8787/oooo