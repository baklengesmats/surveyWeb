import { Controller, useForm } from 'react-hook-form'
import { Survey as SurveyModel } from '@/models/survey'
import { fetchSurveyById } from '@/services/apiSurvey'
import { useState, useEffect } from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Question } from '@/models/question'
import { SurveyResponse } from '@/models/surveyResponse'
import { submitSurveyResponse } from '@/services/apiSurveyResponse'

interface SurveyProps {
  userId: string
  onRefresh: () => void // New prop to trigger refresh
}

function Survey({ userId, onRefresh }: SurveyProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false) // State for spinner
  const form = useForm<Record<string, string>>({
    defaultValues: {}, // Default values will be set dynamically
    mode: 'onChange'
  })

  useEffect(() => {
    async function loadSurvey() {
      try {
        const response: SurveyModel = await fetchSurveyById(
          '5db1e490-9486-4d2b-b5ef-7d78ed33447c'
        )
        setQuestions(response.questions)

        // Set default values for the form based on the questions
        const defaultValues = response.questions.reduce((acc, question) => {
          acc[`question-${question.questionId}`] = '' // Set empty string as the default value
          return acc
        }, {} as Record<string, string>)
        form.reset(defaultValues) // Reset form with default values
      } catch (error) {
        console.error('Error loading survey:', error)
      }
    }
    loadSurvey()
  }, [form])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true) // Show spinner
    let surveyResponse: SurveyResponse = {
      surveyId: '5db1e490-9486-4d2b-b5ef-7d78ed33447c',
      answers: Object.values(data).map((grade, index) => ({
        questionId: questions[index].questionId,
        grade: parseInt(grade as string)
      })),
      userId: userId
    }

    try {
      console.log('Submitting survey response:', surveyResponse)
      await submitSurveyResponse(surveyResponse)
      console.log('Survey response submitted successfully')

      // Reset form to original values
      const defaultValues = questions.reduce((acc, question) => {
        acc[`question-${question.questionId}`] = '' // Reset to empty string
        return acc
      }, {} as Record<string, string>)
      form.reset(defaultValues)

      onRefresh()
    } catch (error) {
      console.error('Error submitting survey response:', error)
    } finally {
      setIsSubmitting(false) // Hide spinner
    }
  }

  return (
    <div className="questions m-2">
      <h3 className="text-xl font-bold text-center">Survey Form</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {questions.map((question) => (
            <Controller
              key={question.questionId}
              control={form.control}
              name={`question-${question.questionId}`}
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <FormItem className="mb-4">
                  <FormLabel>{question.text}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={`w-64 ${
                          fieldState.error ? 'border border-red-500' : ''
                        }`}
                      >
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          {
                            length: question.maxGrade - question.minGrade + 1
                          },
                          (_, i) => i + question.minGrade
                        ).map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="mt-4 px-4 py-2 bg-black text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          {isSubmitting && (
            <div className="mt-4 flex justify-center">
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-black"></div>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}

export default Survey