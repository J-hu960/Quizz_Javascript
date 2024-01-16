import { Button } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
const LIMIT_QUESTIONS = 5

const Start = () => {
    const fetchQuestions = useQuestionsStore(state=>state.fetchQuestions)

  return (
    <Button onClick={()=>fetchQuestions(LIMIT_QUESTIONS)} variant="contained" >
        Empezar!
    </Button >
  )
}

export default Start