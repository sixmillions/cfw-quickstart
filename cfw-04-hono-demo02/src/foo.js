import { Hono } from 'hono'
import { validator } from 'hono/validator'

const fooApp = new Hono();

/**
 * 简单校验参数
 * https://hono.dev/guides/validation
 */
fooApp.post(
  //请求路径会和前面路径叠加
  "/post",
  //校验
  validator('form', (value, c) => {
    console.log("所有参数：", value)
    const name = value['name']
    if (!name || typeof name !== 'string') {
      return c.text('Invalid!', 400)
    }
    return {
      name: name,
    }
  }),
  //请求处理
  (c) => {
    //校验过的form
    const { name } = c.req.valid('form')
    console.log("name: ", name)
    return c.text(`新增会员 ${name}`)
  }
)

export default fooApp