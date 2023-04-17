import { Hono } from 'hono'
import { logger } from 'hono/logger'
import vipApp from './vip.js'
import fooApp from './foo.js'

const app = new Hono()
app.use("*", logger())

app.get('/', (c) => c.text('Home Page.')) // http://localhost:8787

app.get('/user/:id', (c) => c.text(`获取请求路径中的id: ${c.req.param('id')}`)) // http://localhost:8787/user/111

app.post('/post', (c) => c.text('post 请求')) // curl -X POST http://localhost:8787/post

app.route("/vip", vipApp) //将该路径的请求交给别的路由处理
app.route("/foo", fooApp) //将该路径的请求交给别的路由处理

app.notFound((c) => c.text('页面走丢了', 404)) // http://localhost:8787/other

app.get('/err', (c) => { throw new Error('异常测试') }) // http://localhost:8787/err

app.onError((err, c) => {
  console.log("error: ", err)
  return c.text("ops! 出错了", 500)
})

export default app