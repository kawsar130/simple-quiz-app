import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./Banner.css";

import { bounce } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
    bounce: {
        animation: "x 1s",
        animationName: Radium.keyframes(bounce, "bounce")
    }
};

const Banner = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [list, setList] = useState([]);

    function QuestionAns(question, answer, trueAnswer) {
        this.questionText = question;
        this.answerText = answer;
        this.trueAnswerText = trueAnswer;
    }

    const handleAnswerOptionClick = (isCorrect, question, answer) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }

        const trueAns = questions[currentQuestion].answerOptions.filter(
            (ans) => ans.isCorrect === true
        );
        const trueAnsText = trueAns[0].answerText;

        const questionAnswerList = new QuestionAns(
            question,
            answer,
            trueAnsText
        );

        list.push(questionAnswerList);
    };

    console.log(list);

    const questions = [
        {
            questionText: "You can reset system time by:",
            answerOptions: [
                { answerText: "Control Panel", isCorrect: true },
                { answerText: "Write", isCorrect: false },
                { answerText: "Calender", isCorrect: false },
                { answerText: "Browser", isCorrect: false }
            ]
        },
        {
            questionText: "You should save your computer from:",
            answerOptions: [
                { answerText: "Time Bombs", isCorrect: false },
                { answerText: "Viruses", isCorrect: true },
                { answerText: "Worms", isCorrect: false },
                { answerText: "All of them", isCorrect: false }
            ]
        },
        {
            questionText: "World Wide Web is being standard by:",
            answerOptions: [
                { answerText: "Worldwide Corporation", isCorrect: false },
                { answerText: "World Wide Consortium", isCorrect: false },
                { answerText: "World Wide Web Standard", isCorrect: false },
                { answerText: "W3C", isCorrect: true }
            ]
        },
        {
            questionText: "A Microsoft Windows is a/an:",
            answerOptions: [
                { answerText: "Graphic Program", isCorrect: false },
                { answerText: "Word Processor", isCorrect: false },
                { answerText: "Database Program", isCorrect: false },
                { answerText: "Operating System", isCorrect: true }
            ]
        }
    ];

    return (
        <div className="banner-container">
            <StyleRoot style={styles.bounce}>
                <h2>Let's take some quiz test on Computer Fundamental!</h2>
            </StyleRoot>
            {showScore ? (
                <div>
                    <h5>
                        Your Score is {score} out of {questions.length}{" "}
                    </h5>
                    <h5 className="mt-3">Summary</h5>
                    {list.map((item, index) => (
                        <div key={index} className="score-summary">
                            <p className="fs-5">
                                Question {index + 1}: {item.questionText}
                            </p>
                            <p className="answer">
                                Selected Answer: {item.answerText}
                            </p>
                            <p className="answer">
                                Correct Answer: {item.trueAnswerText}
                            </p>
                        </div>
                    ))}
                    <Button
                        onClick={() => {
                            setCurrentQuestion(0);
                            setScore(0);
                            setShowScore(false);
                            setList([]);
                        }}
                        variant="danger"
                        size="lg"
                        className="px-5 mb-5"
                    >
                        Reset
                    </Button>
                </div>
            ) : (
                <div>
                    <p className="text-black-50 mb-1 mt-3">
                        Question {currentQuestion + 1}/{questions.length}
                    </p>

                    <p className="fs-4 mb-1">
                        {questions[currentQuestion].questionText}
                    </p>

                    <Container className="btn-container">
                        {questions[currentQuestion].answerOptions.map(
                            (answerOption) => (
                                <Button
                                    key={answerOption.answerText}
                                    onClick={() =>
                                        handleAnswerOptionClick(
                                            answerOption.isCorrect,
                                            questions[currentQuestion]
                                                .questionText,
                                            answerOption.answerText
                                        )
                                    }
                                    variant="none"
                                    className="btn-ans"
                                >
                                    {answerOption.answerText}
                                </Button>
                            )
                        )}
                    </Container>
                </div>
            )}
        </div>
    );
};

export default Banner;
