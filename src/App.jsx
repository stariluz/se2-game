import React, { useState } from "react";
import topicsData from "./data.json";
import "./App.css";

export default function FlashcardGame() {
  const [screen, setScreen] = useState("home"); // home, quiz, result
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const startTopic = (topic) => {
    setCurrentTopic(topic);
    setCurrentQuestionIndex(0);
    setScore(0);
    setScreen("quiz");
    setSelectedAnswer(null);
    setShowCorrect(false);
  };

  const handleConfirm = () => {
    if (!showCorrect) {
      const correctIndex = currentTopic.questions[currentQuestionIndex].correctIndex;
      if (selectedAnswer === correctIndex) {
        setScore((prev) => prev + 1);
      }
      setShowCorrect(true);
    } else {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < currentTopic.questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setShowCorrect(false);
      } else {
        setScreen("result");
      }
    }
  };

  const goHome = () => {
    setScreen("home");
    setCurrentTopic(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowCorrect(false);
    setScore(0);
  };

  return (
    <main className="main">
      {screen === "home" && (
        <div className="home">
          {topicsData.map((topic, index) => (
            <button
              key={index}
              className="card"
              onClick={() => startTopic(topic)}
            >
              {topic.name}
            </button>
          ))}
        </div>
      )}

      {screen === "quiz" && (
        <div className="quiz">
          <h2 className="subject">{currentTopic.name}</h2>
          <p className="question-number">
            Pregunta {currentQuestionIndex + 1} de {currentTopic.questions.length}
          </p>
          <p className="question-title">
            {currentTopic.questions[currentQuestionIndex].question}
          </p>
          <div className="options">
            {currentTopic.questions[currentQuestionIndex].options.map((option, idx) => {
              const correctIndex = currentTopic.questions[currentQuestionIndex].correctIndex;
              const isCorrect = idx === correctIndex;
              const isSelected = idx === selectedAnswer;
              let classes = "card card-option";

              if (showCorrect) {
                if (isCorrect) classes += " is-correct";
                else if (isSelected && !isCorrect) classes += " is-wrong";
                else classes += "";
              } else if (isSelected) {
                classes += " selected";
              } else {
                classes += "";
              }

              return (
                <button
                  key={idx}
                  className={classes}
                  onClick={() => !showCorrect && setSelectedAnswer(idx)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <div className="footer">
            {showCorrect && (
              <p className="answer">
                <b>Respuesta {currentTopic.questions[currentQuestionIndex].correctIndex==selectedAnswer?'correcta':'incorrecta'} </b> <br />
                {currentTopic.questions[currentQuestionIndex].options[currentTopic.questions[currentQuestionIndex].correctIndex]}
              </p>
            )}

            <button
              className="btn"
              onClick={handleConfirm}
              disabled={selectedAnswer === null && !showCorrect}
            >
              {showCorrect ? "Siguiente" : "Confirmar"}
            </button>
          </div>
        </div>
      )}

      {screen === "result" && (
        <div className="results">
          <h2 className="subject">¡Resultados!</h2>
          <p className="results">
            {score} de {currentTopic.questions.length} respuestas correctas.
          </p>
          <button
            className="btn"
            onClick={goHome}
          >
            Volver al inicio
          </button>
        </div>
      )}
    </main>
  );
}
