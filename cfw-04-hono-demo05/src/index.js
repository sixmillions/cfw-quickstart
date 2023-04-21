import { b2App, B2_DOMAIN } from "./domain/b2oss";
import { githubApp, GITHUB_DOMAIN } from "./domain/github"
import { psApp, PS_DOMAIN } from "./domain/uploadToB2"

addEventListener('fetch', (event) => {
	event.respondWith(
		handleRequest(event).catch((err) =>
			new Response(err.stack, { status: 500 })
		)
	);
});

async function handleRequest(event) {
	const { host } = new URL(event.request.url)
	console.log("host:", host)
	switch (host) {
		case B2_DOMAIN:
			return await b2App.handleEvent(event);
		case GITHUB_DOMAIN:
			return await githubApp.handleEvent(event);
		case PS_DOMAIN:
			return await psApp.handleEvent(event);
		default:
			return new Response("Hello World");
	}
}
