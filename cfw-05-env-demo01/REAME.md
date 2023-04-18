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

# 读取配置

## wrangler.toml

1. `wrangler.toml` 中的 `[vars]` 定义的变量会全环境生效，
2. 能在 `Settings -> Variables -> Environment Variables` 中查到
3. 每次发布都会将远端worker的删除，将本地 `toml` 中的var更新进去
4. 可以在远端页面上直接修改值

## .dev.vars

1. `.dev.vars` 文件中的配置会覆盖 `toml` 的变量
2. 只在 `dev` 环境生效，也就是 `wrangler dev` 或者加 `--env dev`

## 使用

1. 没有env参数直接在代码中使用 `console.log(FOO)`
2. 有env参数，可以通过env.FOO访问，env存了所有定义的环境变量
3. .dev.vars覆盖toml中有的变量，增加toml中没有的变量