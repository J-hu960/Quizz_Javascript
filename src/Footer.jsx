import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions"

const Footer = () => {
    const questions = useQuestionsStore(state=>state.questions)
    const reset = useQuestionsStore(state=>state.reset)

    let correct =0;
    let incorrect =0;
    let unAswered =0;
    questions.forEach(question => {
        if(question.userSelectedAnswer==undefined) unAswered++
        else if(question.userSelectedAnswer==question.correctAnswer) correct++
        else if(question.userSelectedAnswer !==undefined && question.userSelectedAnswer!==question.correctAnswer)incorrect++
        
    });

    const getTextColor=(grade)=>{
      if(grade<=4) return 'red'
      else if(grade<=5.5) return 'orange'
      else if(grade<=8.5) return 'yellow'
      else if(grade<=10) return 'green'

    }


  return (
    <>
    <footer  style={{marginTop:'16px', display:'flex',marginBottom:'12px', flexDirection:'column',border:'1px solid white'}}>
    

        <strong style={{color:'green'}} >Correctas: {correct}</strong>
        <strong style={{color:'red'}}>Incorrectas: {incorrect}</strong>
        <strong>No contestadas: {unAswered}</strong>
        {correct+incorrect===questions.length?
         (<h2>Nota final: <span style={{color:getTextColor((correct/questions.length)*10)}}>{(correct/questions.length)*10}</span> </h2>):(null)}
       

      
      


    </footer>
    
    <Button onClick={()=>reset()}>
    Resetear Juego
    </Button>
    </>
  )
}

export default Footer