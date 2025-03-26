# SurveyWeb
SurveyWeb is a web application built with React, TypeScript, and Vite. It allows users to participate in surveys, view benchmarks for survey responses, and submit their own responses. 

## Features
- Survey Form: Users can fill out surveys and submit their responses.
- Benchmark View: Displays mean and median grades for survey questions.
- API Integration: Fetch survey data, benchmarks, and submit responses via REST APIs.

### Tech Stack
- Frontend Framework: React (with TypeScript)
- Build Tool: Vite
- Styling: TailwindCSS
- Component Lib : Shadcn

### Prerequisites
Vite requires Node.js version 18+ or 20+

### Installation
1. Clone the repository:
git clone https://github.com/baklengesmats/surveyWeb.git

2. Navigate to the project directory.
Install dependencies
- npm install

3. Start the development server
npm run dev

4. Open the app in your browser:
http://localhost:3000

### API Endpoints
The application communicates with a backend API hosted at https://localhost:44328/. Below are the key endpoints:

- Survey API:

GET /Survey: Fetch all surveys.
GET /Survey/{id}: Fetch a survey by ID.

- Survey Response API:

GET /SurveyResponse/compareMean/{id}: Fetch mean grades for a survey.
GET /SurveyResponse/compareMedian/{id}: Fetch median grades for a survey.
POST /SurveyResponse/submit: Submit a survey response.