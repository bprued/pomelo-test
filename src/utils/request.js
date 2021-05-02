import axios from 'axios'

function checkAxiosStatus(response) {
  if(response.status >= 200 && response.status < 300) {
    return response.data
  }
  const error = new Error(response.statusText)
  error.response = response
  error.status = response.status
  throw error
}

export default function request(url, options) {
  return axios({ ...options, url }).then(checkAxiosStatus)
}

export const GETOption = () => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
}
