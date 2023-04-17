import app from "./api"

export default {
  fetch (request, env, ctx) {
    return app.fetch(request, env, ctx)
  }
}