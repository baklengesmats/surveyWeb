import { SurveyResponse } from "@/models/surveyResponse"

const BASE_URL = 'https://localhost:44328/'


export async function fetchMedianGrade(id: string) {
    try {
      const response = await fetch(`${BASE_URL}SurveyResponse/compareMedian/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch median')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  }

  export async function fetchMeanGrade(id: string) {
    try {
      const response = await fetch(`${BASE_URL}SurveyResponse/compareMean/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch mean')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  }

  export async function submitSurveyResponse(surveyResponse: SurveyResponse) {
    try {
      const response = await fetch(`${BASE_URL}SurveyResponse/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(surveyResponse)
      })
      if (!response.ok) {
        throw new Error('Failed to submit survey response')
      }
    } catch (error) {
      console.error('Error submitting survey response:', error)
      throw error
    }
  }