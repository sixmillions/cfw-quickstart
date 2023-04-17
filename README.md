# Cloudflare Workers

> 官方地址：https://workers.cloudflare.com/

# KV

本地使用KV的时候，需要用preview

```bash
wrangler kv:namespace create KV --preview
```

wrangler.toml

```text
kv_namespaces = [
  { binding = "KV", id = "实际的 kv id", preview_id = "临时 kv id" }
]
```
