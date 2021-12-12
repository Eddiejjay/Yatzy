import axios from 'axios'

// const baseUrl ='http:/localhost:3003/api/players'
const baseUrl ='/api/players'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }