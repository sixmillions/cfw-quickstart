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

# 引入honojs框架

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


# prisma创建 dataProxy

> https://cloud.prisma.io/

获取

## 连接配置

https://github.com/yamiteru/prisma-cloudflare-workers-reproduction/blob/main/prisma/schema.prisma

报错

https://github.com/prisma/prisma/issues/13771
https://community.cloudflare.com/t/how-to-access-environment-variables-from-libraries/480041/2

部署
https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers

初始化
https://www.prisma.io/docs/data-platform/data-proxy/use-data-proxy#steps


# 数据库

https://cloud.memfiredb.com/db


```bash
npm install -D prisma
npx prisma init

# 帮助
npx prisma -h
Generate artifacts (e.g. Prisma Client)
$ prisma generate

Browse your data
$ prisma studio

Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
$ prisma migrate dev

Pull the schema from an existing database, updating the Prisma schema
$ prisma db pull

Push the Prisma schema state to the database
$ prisma db push

Validate your Prisma schema
$ prisma validate

Format your Prisma schema
$ prisma format

# 会删除数据
npx prisma migrate dev --name init
```