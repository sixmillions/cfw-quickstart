/**
 * 请求api
 */
const getJsonData = async url => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('状态码异常')
  }
  return await response.json()
}

export default getJsonData
