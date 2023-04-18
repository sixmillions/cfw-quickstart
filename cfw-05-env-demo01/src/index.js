/**
 * 通过env方式访问
 * http://localhost:8787/ 
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response(`
// 		<div>env中存了所有定义的变量: <code>${JSON.stringify(env)}</code></div>
// 		<div>通过env.FOO访问FOO变量: <code>${env.FOO}</code></div>
// 		`, {headers:{"content-type":"text/html; charset=utf-8"}});
// 	},
// };

// --------------------------------------------------------------------------

/**
 * 没有env参数，直接访问
 * http://localhost:8787/ 
 */

addEventListener('fetch', (event) => {
	event.respondWith(
		handleRequest(event).catch((err) =>
			new Response(err.stack, { status: 500 })
		)
	);
});

async function handleRequest(event) {
	return new Response(`
	<div>没有env参数，直接访问FOO: <code>${FOO}</code></div>
	<div>.dev.vars覆盖toml有中的变量，添加toml中没有的: <code>${BAZ}</code></div>
	`, { headers: { "content-type": "text/html; charset=utf-8" } })
}
