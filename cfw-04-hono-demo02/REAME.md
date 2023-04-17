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

# 引入honojs框架 demo02

> https://hono.dev

```bash
npm install hono
```
 
## get

> http://localhost:8787
> http://localhost:8787/user/111
> http://localhost:8787/other

## post

```bash
curl -X POST http://localhost:8787/post
```

# 子路由

```js
app.route("/vip", vipApp)
```

# 校验

> https://hono.dev/guides/validation