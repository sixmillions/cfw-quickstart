import { Router } from 'itty-router'

/**
 * 创建路由
 */
const router = Router()

/**
 * 请求交给路由去处理
 */
addEventListener('fetch', (event) => {
	event.respondWith(
		router.handle(event.request).catch((err) => new Response(err.stack, { status: 500 }))
	);
});

/**
 * 首页
 * http://localhost:8787
 */
router.get("/", () => {
	return new Response("Hello, world!")
})

/**
 * 获取路径中的参数示例
 * 访问：
 * http://127.0.0.1:8787/user/1111
 * http://127.0.0.1:8787/user/admin%20six
 */
router.get("/user/:id", ({ params }) => {
	// 解码：将类似 "Hello%20world" 转成 "Hello world"
	let userId = decodeURIComponent(params.id)

	// 返回一个界面，置返回类型是 text/html
	return new Response(`<p>Path Params: <code>${userId}</code></p>`, {
		headers: {
			"Content-Type": "text/html"
		}
	})
})

/**
 * post请求示例
 * windows下curl，不能有单引号
 * curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"six\"}" localhost:8787/post
 */
router.post("/post", async request => {
	// cloudflare请求中自带的参数
	let fields = {
		"asn": request.cf.asn,
		"colo": request.cf.colo
	}

	// 如果请求是json，则将请求参数赋给json字段
	if (request.headers.get("Content-Type") === "application/json") {
		fields["json"] = await request.json()
	}

	// 序列化并格式化
	const returnData = JSON.stringify(fields, null, 2);

	return new Response(returnData, {
		headers: {
			"Content-Type": "application/json"
		}
	})
})

/**
 * 默认路由，匹配不上其他的路由，就会走到这里
 * http://localhost:8787/test
 */
router.all("*", () => new Response("404, not found!", { status: 404 }))

