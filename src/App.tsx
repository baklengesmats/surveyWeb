import { useState } from 'react'
import './App.css'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import Survey from './components/survey'
import Benchmark from './components/benchmark'

function App() {
  const [userId, setUserId] = useState(generateGuid())
  const [refreshKey, setRefreshKey] = useState(0) // State to trigger re-renders

  function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1) // Increment refreshKey to trigger re-renders
  }

  return (
    <>
      <div>
      </div>
      <h1 className="text-4xl font-bold text-center text-black font-sans">SurveyWeb</h1>
      <h2 className="text-2xl font-bold text-center text-black font-sans mb-8">Welcome to SurveyWeb</h2>
      <div className="flex flex-col items-center justify-center mb-12">
        <Label htmlFor="userId">UserId</Label>
        <Input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-96  m-2" 
        />
        <Button
          className="mt-2 px-4 py-2 text-white"
          onClick={() => setUserId(generateGuid())}
        >
          Generate New UserID
        </Button>
        <Benchmark key={refreshKey} />
        <Survey userId={userId} onRefresh={handleRefresh} />
      </div>
    </>
  )
}

export default App
