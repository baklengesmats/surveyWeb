const BASE_URL = 'https://localhost:44328/'

export async function fetchSurvey() {
    try {
      const response = await fetch(`${BASE_URL}Survey`)
      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  }

  export async function fetchSurveyById(id : string) {
    try {
      const response = await fetch(`${BASE_URL}Survey/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  }