import { v4 as uuidv4 } from 'uuid'
import { MINIMUM_ANSWERS, QuestionType } from './constants'
import { IQuestion, IQuestionOption, Quiz as IQuiz } from 'interface/quiz'
import { inputRules, locationEbookRules, locationVideoRules } from './validation'
import { CourseType } from './enum'

export const newQuiz = () => {
  const quizId = uuidv4()
  return {
    isNew: true,
    id: quizId,
    location: '',
    locationError: { isError: false, message: '' },
    questions: [
      {
        id: uuidv4(),
        title: '',
        titleError: { isError: false, message: '' },
        type: QuestionType.SINGLE,
        answers: [
          {
            id: uuidv4(),
            value: '',
            valueError: { isError: false, message: '' },
            isCorrect: true,
          },
        ],
      },
    ],
  }
}

export const newQuestion = () => {
  const questionId = uuidv4()
  return {
    id: questionId,
    title: '',
    titleError: { isError: false, message: '' },
    type: QuestionType.SINGLE,
    answers: [
      {
        id: uuidv4(),
        value: '',
        valueError: { isError: false, message: '' },
        isCorrect: true,
      },
    ],
  }
}

export const newAnswer = () => {
  const answerId = uuidv4()
  return {
    id: answerId,
    value: '',
    valueError: { isError: false, message: '' },
    isCorrect: false,
  }
}

export const validationQuizzes = (quizzes: IQuiz[]) => {
  let hasError = false
  let errorMessage = ''
  const validateQuizzes = [...quizzes]
  validateQuizzes.forEach((quiz) => {
    if (quiz.location.toString() === '') {
      quiz.locationError.isError = true
      quiz.locationError.message = inputRules
      hasError = true
    }
    quiz.questions.forEach((question: IQuestion) => {
      if (question.title.trim() === '') {
        question.titleError.isError = true
        question.titleError.message = inputRules
        hasError = true
      }
      if (question.answers.length < MINIMUM_ANSWERS) {
        hasError = true
        errorMessage = 'The question has at least 2 options'
      }
      question.answers.forEach((answer: IQuestionOption) => {
        if (answer.value.trim() === '') {
          answer.valueError.isError = true
          answer.valueError.message = inputRules
          hasError = true
        }
      })
    })
  })

  return {
    hasError,
    errorMessage,
    validateQuizzes,
  }
}

export const validationQuizzesLocation = (quizzes: IQuiz[], courseData: any) => {
  let hasError = false
  let errorMessage = ''
  const validateQuizzes = [...quizzes]
  const { generalInformation, videos, ebook } = courseData
  const { type } = generalInformation
  validateQuizzes.forEach((quiz) => {
    if (type === CourseType.VIDEO && Number(quiz.location) > videos.length) {
      hasError = true
      errorMessage = locationVideoRules
      quiz.locationError.isError = true
    }
    if (type === CourseType.EBOOK && ebook && Number(quiz.location) > ebook.page) {
      hasError = true
      errorMessage = locationEbookRules
      quiz.locationError.isError = true
    }
  })
  return {
    hasError,
    errorMessage,
    validateQuizzes,
  }
}

export const addNewQuestion = (quizzes: IQuiz[], quizId: string) => {
  const newQuizzes = [...quizzes]
  const quizIndex = quizzes.findIndex((item) => item.id === quizId)
  newQuizzes[quizIndex] = {
    ...newQuizzes[quizIndex],
    questions: [...newQuizzes[quizIndex].questions, newQuestion()],
  }

  return newQuizzes
}

export const deleteQuestionById = (quizzes: IQuiz[], quizId: string, questionId: string) => {
  const newQuizzes = [...quizzes]
  const quizIndex = newQuizzes.findIndex((quiz) => quiz.id === quizId)
  const filterQuestion = newQuizzes[quizIndex].questions.filter((item) => item.id !== questionId)
  newQuizzes[quizIndex].questions = filterQuestion

  return newQuizzes
}

export const changeQuestionType = (
  quizzes: IQuiz[],
  quizId: string,
  questionId: string,
  questionType: QuestionType,
) => {
  const newQuizzes = [...quizzes]
  const quizIndex = newQuizzes.findIndex((quiz) => quiz.id === quizId)
  const questionIndex = newQuizzes[quizIndex].questions.findIndex(
    (question) => question.id === questionId,
  )
  newQuizzes[quizIndex].questions[questionIndex].type = questionType
  const newAnswers = newQuizzes[quizIndex].questions[questionIndex].answers.map((answer) => ({
    ...answer,
    isCorrect: false,
  }))
  newAnswers[0].isCorrect = true
  newQuizzes[quizIndex].questions[questionIndex].answers = [...newAnswers]

  return newQuizzes
}

export const addAnswer = (quizzes: IQuiz[], quizId: string, questionId: string) => {
  const newQuizzes = [...quizzes]
  const quizIndex = newQuizzes.findIndex((quiz) => quiz.id === quizId)
  const questionIndex = newQuizzes[quizIndex].questions.findIndex(
    (question) => question.id === questionId,
  )
  newQuizzes[quizIndex].questions[questionIndex].answers.push(newAnswer())

  return newQuizzes
}

export const changeRadio = (
  quizzes: IQuiz[],
  quizId: string,
  questionId: string,
  answerId: string,
) => {
  const newQuizzes = [...quizzes]
  const quizIndex = newQuizzes.findIndex((quiz) => quiz.id === quizId)
  const questionIndex = newQuizzes[quizIndex].questions.findIndex(
    (question) => question.id === questionId,
  )
  const newAnswers = newQuizzes[quizIndex].questions[questionIndex].answers.map((answer) => ({
    ...answer,
    isCorrect: answer.id === answerId,
  }))
  newQuizzes[quizIndex].questions[questionIndex].answers = [...newAnswers]

  return newQuizzes
}

export const changeQuizLocation = (quizzes: IQuiz[], quizId: string, quizLocation: string) => {
  const quizIndex = quizzes.findIndex((quiz: IQuiz) => quiz.id === quizId)
  const newQuizzes = [...quizzes]
  const thisQuiz = newQuizzes[quizIndex]
  thisQuiz.location = quizLocation
  if (quizLocation) {
    thisQuiz.locationError.isError = false
    thisQuiz.locationError.message = ''
  } else {
    thisQuiz.locationError.isError = true
    thisQuiz.locationError.message = inputRules
  }

  return newQuizzes
}

export const changeQuestionTitle = (
  quizzes: IQuiz[],
  quizId: string,
  questionId: string,
  questionTitle: string,
) => {
  const newQuizzes = [...quizzes]
  const quizIndex = newQuizzes.findIndex((quiz) => quiz.id === quizId)
  const questionIndex = newQuizzes[quizIndex].questions.findIndex(
    (question) => question.id === questionId,
  )
  const thisQuestion = newQuizzes[quizIndex].questions[questionIndex]
  thisQuestion.title = questionTitle
  if (questionTitle.trim()) {
    thisQuestion.titleError.isError = false
    thisQuestion.titleError.message = ''
  } else {
    thisQuestion.titleError.isError = true
    thisQuestion.titleError.message = inputRules
  }

  return newQuizzes
}

export const changeOptionValue = (
  quizzes: IQuiz[],
  quizId: string,
  questionId: string,
  answerId: string,
  answerValue: string,
) => {
  const newQuizzes = [...quizzes]
  const quizIndex = newQuizzes.findIndex((quiz) => quiz.id === quizId)
  const questionIndex = newQuizzes[quizIndex].questions.findIndex(
    (question) => question.id === questionId,
  )
  const answerIndex = newQuizzes[quizIndex].questions[questionIndex].answers.findIndex(
    (answer) => answer.id === answerId,
  )
  const thisAnswer = newQuizzes[quizIndex].questions[questionIndex].answers[answerIndex]
  thisAnswer.value = answerValue
  if (answerValue.trim()) {
    thisAnswer.valueError.isError = false
    thisAnswer.valueError.message = ''
  } else {
    thisAnswer.valueError.isError = true
    thisAnswer.valueError.message = inputRules
  }

  return newQuizzes
}
