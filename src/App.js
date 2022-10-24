import React from "react"
import Main from "./components/Main"
import Quiz from "./components/Quiz"
import Loader from './components/Loader'
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { checkActions } from "./store/check-slice";
import "./App.css"


export default function App() {

    const [newPage, setNewPage] = React.useState(true)
    const [question, setQuestion] = React.useState([])
    // const [showAnswer, setShowAnswer] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [loading, setLoading] = React.useState(true)

    const isCheck = useSelector(state => state.check.isCheck)
    // const isUncheck = useSelector(state => state.uncheck.isCheck)
    console.log(isCheck)

    const dispatch = useDispatch()

    // const checkAnswer = () => {
    //     dispatch(loaderActions.loading())
    // }

    function Render() {
        return (
            setNewPage(prevPage => !prevPage),
            setLoading(true)
        )
    }

    const palyAgain = () => {
        return (
            setNewPage(prevData => !prevData)
        )
    }

    const Check =() => {dispatch(checkActions.check())}
    const Uncheck = () => {dispatch(checkActions.uncheck())}


    React.useEffect(() => {
        if (newPage === false) {
            axios.get("https://opentdb.com/api.php?amount=5&type=multiple")
                .then(res => setQuestion(res.data.results.map((question) => {

                    setLoading(prevState => !prevState)

                    return ({
                        question: question.question,
                        options: question.incorrect_answers.concat([question.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                        correct_answer: question.correct_answer
                    })
                })))
        }
    }, [newPage])

    React.useEffect(() => {
        let count = 0;
        for (let i = 0; i < question.length; i++) {
            if (question[i].selected_answer !== "undefined") {
                if (question[i].options[question[i].selected_answer] === question[i].correct_answer) {
                    count++
                }
            }
        }
        setScore(count)
    }, [question])

    function selectedAnswer(event, question_id, option_id) {
        setQuestion(prevData => {
            return (
                question.map((question, id) => {
                    return (
                        question_id === id ? { ...question, selected_answer: option_id } : question
                    )
                })
            )
        })
    }

    const Questions = question.map((question, index) => {
        return (
            <Quiz
                key={index}
                question={question}
                id={index}
                showAnswer={isCheck}
                selectedAnswer={selectedAnswer}
            />
        )
    })

    return (
        <div className="App">
            {newPage ? <Main Render={Render} /> :
                loading ? <Loader /> :
                    <div>
                        {Questions}
                        {isCheck ?
                            <div className="footer">
                                <h3 className="score">{"You scored " + score + "/5 correct answers"}</h3>
                                <button className="playAgain" onClick={() => {Uncheck(); palyAgain();}}>play Again</button>
                            </div> :
                            <button className="checkAnswer" onClick={()=>Check()}>check Answers</button>
                        }
                    </div>
            }
        </div>
    )
}