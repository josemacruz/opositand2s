// components/TestSummary.tsx
"use client";
import React from "react";

interface Option {
  text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Props {
  questions: Question[];
  answers: { [questionId: number]: number | null };
}

const TestSummary: React.FC<Props> = ({ questions, answers }) => {
  const totalAnswered = Object.values(answers).filter((v) => v !== null).length;
  const correct = questions.filter((q) => {
    const selected = answers[q.id];
    return selected !== null && q.options[selected]?.is_correct;
  }).length;

  const attempts = JSON.parse(localStorage.getItem("userAttempts") || "[]");
  const lastTest = attempts.slice(-questions.length);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📝 Resumen del test</h2>
      <p>Total de preguntas: {questions.length}</p>
      <p>Respondidas: {totalAnswered}</p>
      <p>Correctas: {correct}</p>
      <p>Incorrectas: {totalAnswered - correct}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">🧠 Detalle por pregunta</h3>
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Pregunta</th>
              <th className="border px-2 py-1">Tu respuesta</th>
              <th className="border px-2 py-1">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, idx) => {
              const attempt = lastTest.find((a: any) => a.question_id === q.id);
              const selected = attempt?.selected_option;
              const result = attempt?.is_correct;
              return (
                <tr key={q.id} className="text-center">
                  <td className="border px-2 py-1">{idx + 1}</td>
                  <td className="border px-2 py-1 text-left">
                    {q.text.slice(0, 60)}...
                  </td>
                  <td className="border px-2 py-1">
                    {selected !== undefined && selected !== -1
                      ? q.options[selected]?.text
                      : "Sin responder"}
                  </td>
                  <td className="border px-2 py-1 font-semibold">
                    {selected === -1 ? (
                      "-"
                    ) : result ? (
                      <span className="text-green-600">✔</span>
                    ) : (
                      <span className="text-red-600">✖</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestSummary;
