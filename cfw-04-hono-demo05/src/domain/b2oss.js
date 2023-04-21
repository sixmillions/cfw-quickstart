const B2_DOMAIN = "b2.6bw.fun";

const b2App = {
    handleEvent
};

/**
 * 
 * 代理到B2的同一个区域的不同账号的Bucket
 * https://b2.6bw.fun/0/logo.png
 * 
 * 例如：
 * 1. 我有两个B2的账号都是美国西部地区，所以B2的主机地址是一样的，即DNS解析时候CNAME都指向"f004.backblazeb2.com"
 * 2. 在每个账号下建立不同的Bucket，名字格式都是 six-b2-f(\d+)，例如：six-b2-f0  six-b2-f1
 * 3. 我们通过url区分出不同的Bucket，同时隐藏Bucket的信息，防止被盗刷流量
 * 4. 当我们访问 https://b2.6bw.fun/0/logo.png 即访问 https://b2.6bw.fun/file/six-b2-f0/logo.png
 *    访问 https://b2.6bw.fun/1/vue.jpg  即访问 https://b2.6bw.fun/file/six-b2-f1/vue.jpg
 * 
 */
async function handleEvent(event) {
    let url = new URL(event.request.url);
    // console.log("url pathname:", url.pathname)
    if (url.pathname === '/favicon.ico') {
        return fetch("https://b2.6bw.fun/file/six-b2-f0/favicon.ico");
    }
    if (!url.pathname.startsWith("/file/six-b2-f")) {
        //替换url举例:/0/logo.png => /file/six-b2-f0/logo.png
        url.pathname = url.pathname.replace(/^\//, "/file/six-b2-f");
    }
    return fetch(url);
}

export { b2App, B2_DOMAIN }