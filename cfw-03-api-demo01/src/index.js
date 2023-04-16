import { Router } from 'itty-router'
import { allPeople, getPeopleById } from './api/people';
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
router.get("/", () => new Response("Home Page"))

/**
 * 请求people接口
 * http://127.0.0.1:8787/api/people
 * http://127.0.0.1:8787/api/people/1
 */
router.get("/api/people", allPeople)
router.get("/api//people/:id", ({ params }) => {
	// 解码：将类似 "Hello%20world" 转成 "Hello world"
	let id = decodeURIComponent(params.id)
	return getPeopleById(id)
})

/**
 * 默认路由，匹配不上其他的路由，就会走到这里
 * http://localhost:8787/test
 */
router.all("*", () => new Response("404, not found!", { status: 404 }))

