import indexHtml from '../../html/index.html'

const home = () => new Response(indexHtml, {
  headers: {
    "Content-Type": "text/html"
  }
});

export default home