// Imports
import axios from 'axios'

// The base URL
const baseUrl = 'http://localhost:3001/api'

axios.defaults.withCredentials = true

// Function to get from the api
const get = async (url) => {
  const res = await axios.get(`${baseUrl}/${url}`)
  return res.data
}

// Function to add to the api
const post = async (url, newObject) => {
  const res = await axios.post(`${baseUrl}/${url}`, newObject)
  return res.data
}

// Function to update to the api
const put = async (url, newObject) => {
  const res = await axios.put(`${baseUrl}/${url}`, newObject)
  return res.data
}

// Function to delete to the api
const deleteItem = async (url, data) => {
  const res = await axios.delete(`${baseUrl}/${url}`, { data: { data } });
  return res.data
}

export default { get, post, put, deleteItem }
