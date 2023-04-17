import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Home Page.')) // http://localhost:8787

app.get('/user/:id', (c) => c.text(`获取请求路径中的id: ${c.req.param('id')}`)) // http://localhost:8787/user/111

app.post('/post', (c) => c.text('post 请求')) // curl -X POST http://localhost:8787/post

app.notFound((c) => c.text('页面走丢了', 404)) // http://localhost:8787/other

export default app