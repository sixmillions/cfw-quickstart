import { Hono } from 'hono'
import { keyword } from 'color-convert'

const app = new Hono();

app.get("/", (c) => c.text("一个简单的颜色转换器"))

app.get("/:color-format/:color-name", (c) => {
  const colorFormat = c.req.param("color-format");
  const colorName = c.req.param("color-name");
  if (colorFormat === 'hex') {
    return c.text("#" + keyword.hex(colorName));
  }
  if (colorFormat === 'rgb') {
    return c.text("RGB: " + keyword.rgb(colorName));
  }
  return c.text("只能转化hex和rgb", 500)
})

app.notFound((c) => c.text("404 Not Found", 404))

export default app