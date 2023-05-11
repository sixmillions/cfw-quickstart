/**
 * 参考
 * https://neon.tech/blog/serverless-driver-for-postgres
 */
import { Client } from '@neondatabase/serverless';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;

	// Postgres
	DATABASE_URL: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		// return new Response("Hello World!");
		const client = new Client(env.DATABASE_URL);
		await client.connect();

		// const { rows: [{now}]} = await client.query('select now() union all select now()');
		// console.log(111, now)

		const { rows: [{ id, file_url, file_name }] } = await client.query('select * from file_upload_history;');
		console.log(222,  id, file_url, file_name)
		
		// const res = await client.query("insert into student (name, age) values ('six', 19);")
		// console.log(111, res)

		ctx.waitUntil(client.end());  // this doesn’t hold up the response

		return new Response("Hello");
	},
};
