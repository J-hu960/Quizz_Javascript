import { create } from "zustand";
import preguntas from '../data.json'
import confetti from "canvas-confetti";
import {persist} from 'zustand/middleware'


export const useQuestionsStore = create(persist((set, get) => {
    return {
      questions: [],
      currentQuestion: 0,
  
      fetchQuestions: async (limit) => {
         const randomQuestions = preguntas.sort(()=>Math.random()).slice(0,limit)
         set({questions:randomQuestions})
      },
      selectAnswer: (questionId,answerIndex)=>{
        const {questions} = get()
        //clonamos el objeto preguntas
        const newQuestions = structuredClone(questions) 
        const questionIndex= newQuestions.findIndex(q => q.id===questionId)
        const questionInfo = newQuestions[questionIndex]
        const isCorrectAnswer = questionInfo.correctAnswer === answerIndex
        if(isCorrectAnswer) confetti()
        

        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectAnswer,
          userSelectedAnswer:answerIndex
        }

        set({questions:newQuestions})

      },

      goNextQuestion:()=>{
        const {currentQuestion,questions} = get()
        const nextQuestion = currentQuestion +1
        if(nextQuestion<questions.length){
          set({currentQuestion:nextQuestion})
        }
      },
      goPreviousQuestion:()=>{
        const {currentQuestion,questions} = get()
        const previousQuestion = currentQuestion -1
        if(previousQuestion>=0){
          set({currentQuestion:previousQuestion})
        }
      },
      reset:()=>{
        set({currentQuestion:0,questions:[]})
      }
    }

    }, {

      name:'questions',
    
   })
  );
  