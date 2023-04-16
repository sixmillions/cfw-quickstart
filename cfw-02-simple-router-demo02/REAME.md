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

# 简单路由 demo01

> https://github.com/cloudflare/worker-template-router/blob/master/index.js
> https://developers.cloudflare.com/workers/tutorials/connect-to-turso-using-workers/#install-extra-libraries

```bash
npm install itty-router
```

## get方法  

> http://localhost:8787
> http://127.0.0.1:8787/user/1111
> http://localhost:8787/test

## post方法

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"six\"}" localhost:8787/post
```

# 简单路由 demo02

相比demo01，demo02的不同

1. 将路由中的html单独定义出来
2. 然后在路由中引入，在对应的路由返回

例如：

> http://localhost:8787
> http://localhost:8787/test