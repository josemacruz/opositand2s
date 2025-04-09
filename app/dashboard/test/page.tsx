// pages/test.tsx
"use client";
import { useEffect, useState } from "react";
import TestSummary from "@/components/ui/TestSummary/TestSummary";

interface Question {
  id: number;
  text: string;
  options: { text: string; is_correct: boolean }[];
  category: {
    law_type: string;
    title: string;
    chapter: string;
    section: string;
    article: string;
    boe_section: string;
  };
}

interface Attempt {
  question_id: number;
  attempt_date: string;
  is_correct: boolean;
  selected_option: number;
}

const TestPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{
    [questionId: number]: number | null;
  }>({});
  const [timeLeft, setTimeLeft] = useState(60 * 5);
  const [mode, setMode] = useState<"exam" | "practice">("exam");
  const [attemptsSaved, setAttemptsSaved] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("currentTest");
    const storedMode = localStorage.getItem("currentTestMode") ?? "exam";
    if (stored) {
      const parsed = JSON.parse(stored) as Question[];
      setQuestions(parsed);
      const initialAnswers = Object.fromEntries(
        parsed.map((q) => [q.id, null])
      );
      setAnswers(initialAnswers);
    }
    if (storedMode === "practice" || storedMode === "exam") {
      setMode(storedMode);
    }
  }, []);

  const finishTest = () => {
    if (!attemptsSaved) {
      const now = new Date().toISOString();
      const attempts: Attempt[] = questions.map((q) => {
        const selected = answers[q.id];
        return {
          question_id: q.id,
          attempt_date: now,
          is_correct:
            selected !== null ? q.options[selected].is_correct : false,
          selected_option: selected ?? -1,
        };
      });
      const prev = JSON.parse(localStorage.getItem("userAttempts") ?? "[]");
      localStorage.setItem(
        "userAttempts",
        JSON.stringify([...prev, ...attempts])
      );
      setAttemptsSaved(true);
    }
    setCurrentIndex(questions.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏱ Tiempo agotado. El test ha finalizado.");
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (questionId: number, index: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentIndex];

  if (currentIndex >= questions.length) {
    return <TestSummary questions={questions} answers={answers} />;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Pregunta {currentIndex + 1} / {questions.length}
        </h2>
        <div className="text-red-600 font-bold text-lg">
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {questions.map((q, i) => {
          const answered = answers[q.id] !== null;
          const status = answered
            ? mode === "practice"
              ? q.options[answers[q.id]!]?.is_correct
                ? "bg-green-400"
                : "bg-red-400"
              : "bg-blue-500"
            : "bg-gray-300";

          return (
            <button
              key={q.id}
              className={`w-8 h-8 text-sm rounded-full text-white ${status}`}
              onClick={() => answered && setCurrentIndex(i)}
              disabled={!answered}
              title={answered ? "Ir a la pregunta" : "Responde primero"}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="bg-white border rounded-lg shadow p-4">
        <p className="mb-4 font-medium">{currentQuestion.text}</p>
        <ul className="space-y-2">
          {currentQuestion.options.map((option, i) => {
            const selected = answers[currentQuestion.id] === i;
            const isCorrect = option.is_correct;
            const showFeedback = mode === "practice" && showSolution;
            const highlight = showFeedback && isCorrect;
            return (
              <li key={i}>
                <label
                  className={`flex items-center gap-2 ${
                    highlight ? "bg-green-100 rounded p-1" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    checked={selected}
                    onChange={() => handleAnswer(currentQuestion.id, i)}
                  />
                  <span>{option.text}</span>
                  {selected && showFeedback && (
                    <span
                      className={`ml-2 text-sm ${
                        isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isCorrect ? "✔ Correcta" : "✖ Incorrecta"}
                    </span>
                  )}
                </label>
              </li>
            );
          })}
        </ul>

        {mode === "practice" &&
          answers[currentQuestion.id] !== null &&
          showSolution && (
            <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded">
              <strong>Explicación:</strong>{" "}
              {currentQuestion.category.boe_section}
            </div>
          )}

        {mode === "practice" &&
          answers[currentQuestion.id] !== null &&
          !showSolution && (
            <div className="mt-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => setShowSolution(true)}
              >
                Ver solución
              </button>
            </div>
          )}

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => {
              setCurrentIndex((i) => Math.max(i - 1, 0));
              setShowSolution(false);
            }}
            disabled={currentIndex === 0}
          >
            Anterior
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={finishTest}
            >
              Finalizar Test
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
                setShowSolution(false);
              }}
              disabled={answers[currentQuestion.id] === null}
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
