import axios from 'axios'


// const baseUrl = 'http://localhost:3003/api/points'
const baseUrl = '/api/points'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteAll = async () => {
  const points = await getAll()
  const response = await points.map(points => console.log('deelte', axios.delete(`${baseUrl}/${points.id}`)) )
  return response.data
}

const updatePoints = async (player, combination, points) => {
  const allPoints =  await getAll()
  const serverObject = await allPoints.find(points => points.player === player)
  const id = serverObject.id
  const pointsOfOnePlayer = serverObject.points
  pointsOfOnePlayer[combination]=points
  const updatedServerObject = { ...serverObject, points:{ ...pointsOfOnePlayer } }
  const response = await axios.put(`${baseUrl}/${id}`,updatedServerObject)
  return response
}

const postPoints = async (player) => {
  const pointObject = {
    'points' : {
      'ykkoset': 0,
      'kakkoset': 0,
      'kolmoset': 0,
      'neloset': 0,
      'vitoset': 0,
      'kutoset': 0,
      'valisumma': 0,
      'bonus':0,
      'pari': 0,
      'kaksiparia': 0,
      'kolmesamaa': 0,
      'neljasamaa': 0,
      'pikkusuora' : 0,
      'isosuora': 0,
      'tayskasi': 0,
      'sattuma': 0,
      'yatzy' : 0,
      'pisteet': 0
    } ,
    'player': player
  }

  const response = await axios.post(baseUrl , pointObject)
  return response.data
}

export default { getAll, postPoints, deleteAll, updatePoints }