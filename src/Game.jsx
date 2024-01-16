import { Card, IconButton,List,ListItemButton,ListItem,ListItemText,Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import SyntaxHighlighter from "react-syntax-highlighter"
import {gradientDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import Footer from "./Footer"

const Question = ({info}) =>{
    const selectAnswer = useQuestionsStore(state=>state.selectAnswer)
    const createHandleClick = (answIndex)=>{
        selectAnswer(info.id,answIndex)
    }

    const getBackgroundColor = (index)=>{
        const {userSelectedAnswer, correctAnswer} = info

        if(userSelectedAnswer==null) return 'transparent'

        if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

        if(index === correctAnswer && index === userSelectedAnswer) return 'green'

        if(index !== correctAnswer && index === userSelectedAnswer) return 'red'

        if(index ===correctAnswer && index !== userSelectedAnswer) return 'green'
    }


    return(
        <Card sx={{bgcolor:'#222', padding:2, textAlign:'left'}}  variant="outlined">
            <Typography variant="h5">
                {info.question}
            </Typography>
            <SyntaxHighlighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>
            <List sx={{bgcolor:'#333'}}>
                {info.answers.map((ans,index)=>(
                    <ListItem divider  key={index}>
                        <ListItemButton 
                          disabled={info.userSelectedAnswer!==undefined}
                           sx={{bgcolor:getBackgroundColor(index)}}   
                            onClick={()=>createHandleClick(index)} >
                            <ListItemText primary={ans} sx={{textAlign:'center'}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )

}
const Game = () => {
    const questions = useQuestionsStore(state=>state.questions)

    const currentQuestion = useQuestionsStore(state=>state.currentQuestion)

    const questionInfo = questions[currentQuestion]

    const goNextQuestion = useQuestionsStore(state=>state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state=>state.goPreviousQuestion)


  return (
    <>
    <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
       <IconButton onClick={()=>goPreviousQuestion()}  disabled={currentQuestion===0}>
            <ArrowBackIosNew />
        </IconButton>
        {currentQuestion +1 } / {questions.length}

        

        <IconButton onClick={()=>goNextQuestion()}  disabled={currentQuestion>questions.length-1}>
            <ArrowForwardIos />
        </IconButton>

     </Stack>
     <Question info={questionInfo} />
     <Footer />

    </>
  )
}

export default Game