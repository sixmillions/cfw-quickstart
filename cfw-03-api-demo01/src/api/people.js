import getJsonData from "./api"

export const allPeople = async () => {
  const { results } = await getJsonData("https://swapi.dev/api/people")
  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const getPeopleById = async (id) => {
  const res = await getJsonData(`https://swapi.dev/api/people/${id}`)
  return new Response(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json"
    }
  })
}