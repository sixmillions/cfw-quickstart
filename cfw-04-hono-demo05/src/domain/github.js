const GITHUB_DOMAIN = "github.6bw.fun";

const githubApp = {
    handleEvent
};

/**
 * 代理
 * @param {*} event 
 * @returns 
 */
async function handleEvent(event) {
    const request = event.request;
    const url = new URL(request.url)
    url.host = 'github.com'
    url.protocol = 'https:'

    // This code will forward any headers that the 
    // browser sends with the request.
    const headers = new Headers(request.headers)
    headers.append('Host', 'github.com')

    const method = request.method
    const body = request.method === 'GET' ? undefined : request.body

    const githubRequest = new Request(url.toString(), {
        method,
        headers,
        body
    })

    const githubResponse = await fetch(githubRequest)
    return githubResponse;
    // const responseHeaders = new Headers({
    //   'content-type': githubResponse.headers.get('content-type'),
    //   'access-control-allow-origin': '*'
    // })

    // return new Response(await githubResponse.text(), {
    //   status: githubResponse.status,
    //   statusText: githubResponse.statusText,
    //   headers: responseHeaders
    // })
}

export { githubApp, GITHUB_DOMAIN }