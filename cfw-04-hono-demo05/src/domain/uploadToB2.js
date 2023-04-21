import { Hono } from 'hono'
const PS_DOMAIN = "ps.6bw.fun";
// const PS_DOMAIN = "localhost:8787";

const psApp = new Hono();

const key = 'cccc';
const appKey = 'sss';
const bucketId = 'b5a62712aeb87a948d79061c';//six-b2-f0
const bucketName = 'six-b2-f0';

//curl -X POST -F 'file=@/tmp/logo.png' https://ps.6bw.fun/api/upload
const apiVer = 'b2api/v2';
// const b2FileUrl = `https://${bucketName}.s3.us-west-004.backblazeb2.com`;
const b2FileUrl = `https://b2.6bw.fun/0`;

//认证过期时间
const authExpiration = 79200;

psApp.get('/', (c) => c.text('curl -X POST -F \'file=@/tmp/logo.png\' https://ps.6bw.fun/api/upload'))
psApp.post('/api/upload', (c) => handleRequest(c.req))


async function handleRequest(request) {
    // Only accept a POST
    if (request.method !== 'POST') {
        return new Response('{"error": "Bad request!"}', { status: 400 });
    }
    

    // Parse the request to FormData
    const formData = await request.formData();
    // Get the File from the form. Key for the file is 'file' for me
    const file = formData.get('file');
    if (!file) {
        return new Response('文件内容缺失', { status: 400 })
    }
    

    const authInfo = await auth();
    if (!authInfo) {
        return new Response('{"error": "Failed to upload!"}', { status: 401 });
    }

    const fileName = await upload(authInfo, file);
    if (!fileName) {
        return new Response('{"error": "Failed to upload!"}', { status: 500 });
    }
    console.log("222", fileName)

    return new Response(`{"message": "Uploaded!", "file": "${fileName}", "b2Url": "${b2FileUrl}/${fileName}"}`);
}

// returns: { "apiUrl", "authToken", "bucketAuth", "uploadUrl" }
async function auth() {
    // We will try and fetch the auth token and upload URL from KV.
    // They are valid for 24 hours so no need to request it every time
    // { "apiUrl", "authToken", "bucketAuth", "uploadUrl" }
    const storedAuthInfo = await KV.get('auth-info', 'json');

    if (storedAuthInfo) {
        return storedAuthInfo;
    }

    // If we are not authorized then let's do that!
    const authInfo = {};

    const authRes = await fetch(`https://api.backblazeb2.com/${apiVer}/b2_authorize_account`, {
        headers: {
            Authorization: 'Basic ' + btoa(key + ':' + appKey)
        }
    });
    const authJson = await authRes.json();
    // await KV.put('auth-res', JSON.stringify(authJson), { expirationTtl: authExpiration });

    if (!authRes.ok) {
        console.error('Failed to authenticate, got json:', authJson);
        return false;
    }

    // Grab the auth token from the responses
    authInfo.apiUrl = authJson.apiUrl;
    authInfo.authToken = authJson.authorizationToken;

    // Grab the upload URL
    const uploadRes = await fetch(`${authJson.apiUrl}/${apiVer}/b2_get_upload_url`, {
        method: 'POST',
        headers: {
            Authorization: authJson.authorizationToken
        },
        body: JSON.stringify({
            bucketId
        })
    });
    const uploadJson = await uploadRes.json();

    if (!uploadRes.ok) {
        console.error('Failed to get upload URL, got json:', uploadJson);
        return false;
    }

    authInfo.bucketAuth = uploadJson.authorizationToken;
    authInfo.uploadUrl = uploadJson.uploadUrl;

    // Write the details into KV so we can get them in future calls.
    // Note this can take up to 60 seconds to propagate globally.
    await KV.put('auth-info', JSON.stringify(authInfo), { expirationTtl: authExpiration });

    return authInfo;
}

async function upload(authInfo, file) {
    const extension = file.name.substring(file.name.lastIndexOf('.'));

    // I'm gonna use UUIDs for files here but you could use anything
    // const uploadedFileName = crypto.randomUUID() + extension;
    const uploadedFileName = formatDateFileName(extension);

    const hash = await sha1(file);

    const res = await fetch(authInfo.uploadUrl, {
        method: 'POST',
        headers: {
            'Authorization': authInfo.bucketAuth,
            'X-Bz-File-Name': uploadedFileName,
            // We have the type and size of the image in File
            'Content-Type': file.type,
            'Content-Length': file.size,
            // SHA-1 of the file
            'X-Bz-Content-Sha1': hash,
        },
        body: file.stream()
    });

    if (!res.ok) {
        const json = await res.json();
        console.error('Failed to upload, got json:', json);
        return false;
    }

    return uploadedFileName;
}

async function sha1(file) {
    const fileData = await file.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-1', fileData);
    const array = Array.from(new Uint8Array(digest));
    const sha1 = array.map(b => b.toString(16).padStart(2, '0')).join('')
    return sha1;
}

function formatDateFileName(extension) {
    let date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}${month}/${day}${hour}${minute}${second}${extension}`;
}

export { psApp, PS_DOMAIN }