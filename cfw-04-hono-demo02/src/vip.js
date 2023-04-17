import { Hono } from 'hono'

const vipApp = new Hono();

/**
 * Restful风格api
 * http://localhost:8787/vip/999
 * curl -X POST http://localhost:8787/vip/999
 * curl -X PUT http://localhost:8787/vip/999
 * curl -X DELETE http://localhost:8787/vip/999
 */
vipApp.get("/:id", (c) => {
  // const id = c.req.query("id") // 获取查询参数
  const id = c.req.param("id") // 路径参数
  c.header("six-vip", "custom header") // 自定义header
  return c.text(`会员id: ${id}`);
})
.post((c) => {
  // 请求路径也是 vip/:id
  return c.text("新增会员")
})
.put((c) => {
  // 请求路径也是 vip/:id
  return c.text("更新会员")
})
.delete((c) => {
  // 请求路径也是 vip/:id
  return c.text("删除会员")
})

export default vipApp