import notFoundHtml from '../../html/404.html'

const notFound = () => new Response(notFoundHtml, {
  status: 404,
  headers: {
    "Content-Type": "text/html"
  }
});

export default notFound