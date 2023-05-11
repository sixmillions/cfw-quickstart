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

# neon数据库

修改配置 DATABASE_URL

直接发送sql语句操作neon的pg数据库

https://neon.tech/blog/serverless-driver-for-postgres