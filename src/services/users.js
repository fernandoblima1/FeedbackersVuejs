export default httpClient => ({
  getMe: async () => {
    const response = await httpClient.get('/users/me')

    const data = await response.data

    if (!data) {
      const errors = {
        status: response.status,
        statusText: response.statusText
      }
      return errors
    }

    return {
      data
    }
  },
  
  generateApiKey: async () => {
    const response = await httpClient.post('/users/me/apikey')

    const data = await response.data

    if (!data) {
      const errors = {
        status: response.status,
        statusText: response.statusText
      }
      return errors
    }

    return {
      data
    }

  }
})