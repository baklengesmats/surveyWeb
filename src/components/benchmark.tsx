
import { CalcGrade } from "@/models/CalcGrade"
import { Question} from "@/models/question"
import { fetchSurveyById } from "@/services/apiSurvey"
import { fetchMeanGrade, fetchMedianGrade } from "@/services/apiSurveyResponse"
import { useEffect, useState } from "react"

function Benchmark() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [mean, setMean] = useState<CalcGrade[]>([])
    const [median, setMedian] = useState<CalcGrade[]>([])
    
    useEffect(() => {

    async function loadData() {
    const [surveyResponse, meanResponse, medianResponse] = await Promise.all([
        fetchSurveyById('5db1e490-9486-4d2b-b5ef-7d78ed33447c'),
        fetchMeanGrade('5db1e490-9486-4d2b-b5ef-7d78ed33447c'),
        fetchMedianGrade('5db1e490-9486-4d2b-b5ef-7d78ed33447c'),
      ]);

      setQuestions(surveyResponse.questions)
      setMean(meanResponse)
      setMedian(medianResponse)
    }
    loadData()
  }, [])

    return (<>
        <div>
            <h1 className="text-2xl font-bold text-center mb-4">Benchmark Survey</h1>
            <ul className="space-y-4">
                {questions.map((question) => {
                    const meanGrade = mean.find((g) => g.questionId === question.questionId)?.grade
                    const medianGrade = median.find((g) => g.questionId === question.questionId)?.grade

                    return (
                        <li key={question.questionId} className="p-4 border rounded shadow">
                            <h2 className="text-lg font-semibold">{question.text}</h2>
                            <p className="text-sm text-gray-600">
                                Mean Grade: {meanGrade !== undefined ? meanGrade : 'Loading...'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Median Grade: {medianGrade !== undefined ? medianGrade : 'Loading...'}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </div>
    </>
    );
}

export default Benchmark;