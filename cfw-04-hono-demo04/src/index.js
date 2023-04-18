/**
 * 写法一
 * export default app
 */

import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text(`Hello World! ${new Date()}`)) // http://localhost:8787
export default app

// ---------------------------------------------------------------------------

/**
 * 写法二
 * await app.fetch
 */

// import { Hono } from 'hono'
// const app = new Hono()
// app.get('/', (c) => c.text(`Hello World! ${new Date()}`)) // http://localhost:8787
// export default {
// 	async fetch(request, env, ctx) {
// 		//交给hono处理
//         return await app.fetch(request, env, ctx)
// 	},
// };

// ---------------------------------------------------------------------------

/**
 * 写法三
 * app.handleEvent
 */

// import { Hono } from 'hono'
// const app = new Hono()
// app.get('/', (c) => c.text(`Hello World! ${new Date()}`)) // http://localhost:8787
// addEventListener('fetch', (event) => {
// 	event.respondWith(
//         //交给hono处理
// 		app.handleEvent(event)
// 	);
// });

// ---------------------------------------------------------------------------

/**
 * 写法四
 * app.request
 */

// import { Hono } from 'hono'
// const app = new Hono()
// app.get('/', (c) => c.text(`Hello World! ${new Date()}`)) // http://localhost:8787
// addEventListener('fetch', (event) => {
// 	event.respondWith(
//         //交给hono处理
// 		// app.request(event.request.url)
// 		app.request(event.request)
// 	);
// });

// ---------------------------------------------------------------------------

