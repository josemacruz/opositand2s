// pages/examenes.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockQuestions } from "@/data/questions";

interface LawStructure {
  law_type: string;
  titles: {
    title: string;
    chapters: {
      chapter: string;
      sections: string[];
    }[];
  }[];
}

interface Question {
  id: number;
  text: string;
  options: { text: string; is_correct: boolean }[];
  city: string;
  exam_date: string;
  is_exam: boolean;
  category: {
    law_type: string;
    title: string;
    chapter: string;
    section: string;
    article: string;
    boe_section: string;
  };
}

const Exams = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<{
    laws: LawStructure[];
    cities: string[];
    years: number[];
  }>({ laws: [], cities: [], years: [] });

  const [selectedLaws, setSelectedLaws] = useState<string[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const mockFilters = {
      laws: [
        {
          law_type: "Constitución Española",
          titles: [
            {
              title: "Título I",
              chapters: [
                {
                  chapter: "Capítulo I",
                  sections: ["Sección 1", "Sección 2"],
                },
              ],
            },
          ],
        },
        {
          law_type: "Reglamento General de la Circulación",
          titles: [
            {
              title: "Título IV",
              chapters: [
                {
                  chapter: "Capítulo VI",
                  sections: ["Sección I"],
                },
              ],
            },
          ],
        },
      ],
      cities: ["Sevilla", "Granada", "Villamartín"],
      years: [2025, 2024, 2023],
    };

    setQuestions(mockQuestions);
    setFilters(mockFilters);
  }, []);

  const availableTitles = filters.laws
    .filter((l) => selectedLaws.includes(l.law_type))
    .flatMap((l) => l.titles);
  const availableChapters = availableTitles
    .filter((t) => selectedTitles.includes(t.title))
    .flatMap((t) => t.chapters);
  const availableSections = availableChapters
    .filter((c) => selectedChapters.includes(c.chapter))
    .flatMap((c) => c.sections);

  const handleStartTest = () => {
    const count = parseInt(
      (document.getElementById("questionCount") as HTMLInputElement)?.value ||
        "50"
    );
    const examYear = (document.getElementById("examYear") as HTMLSelectElement)
      ?.value;
    const examLocation = (
      document.getElementById("examLocation") as HTMLSelectElement
    )?.value;
    const isRealExam = (
      document.getElementById("realExams") as HTMLInputElement
    )?.checked;
    const examModeChecked = (
      document.getElementById("examMode") as HTMLInputElement
    )?.checked;
    const practiceModeChecked = (
      document.getElementById("practiceMode") as HTMLInputElement
    )?.checked;

    if (examModeChecked) {
      localStorage.setItem("currentTestMode", "exam");
    } else if (practiceModeChecked) {
      localStorage.setItem("currentTestMode", "practice");
    } else {
      localStorage.setItem("currentTestMode", "exam");
    }

    const filtered = questions.filter((q) => {
      return (
        (selectedLaws.length === 0 ||
          selectedLaws.includes(q.category.law_type)) &&
        (selectedTitles.length === 0 ||
          selectedTitles.includes(q.category.title)) &&
        (selectedChapters.length === 0 ||
          selectedChapters.includes(q.category.chapter)) &&
        (selectedSections.length === 0 ||
          selectedSections.includes(q.category.section)) &&
        (!examYear ||
          new Date(q.exam_date).getFullYear().toString() === examYear) &&
        (!examLocation || q.city === examLocation) &&
        (!isRealExam || q.is_exam === true)
      );
    });

    const randomized = filtered.sort(() => Math.random() - 0.5).slice(0, count);
    localStorage.setItem("currentTest", JSON.stringify(randomized));
    router.push("/dashboard/test");
  };

  const handleResetFilters = () => {
    setSelectedLaws([]);
    setSelectedTitles([]);
    setSelectedChapters([]);
    setSelectedSections([]);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Crear Nuevo Test</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="questionCount" className="block font-medium">
            Número de preguntas:
          </label>
          <input
            id="questionCount"
            type="number"
            min="1"
            max="100"
            defaultValue="50"
            className="mt-1 border rounded px-4 py-2 w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="examMode" className="flex items-center gap-1">
            <input id="examMode" type="checkbox" className="form-checkbox" />{" "}
            Modo Examen
          </label>
          <label htmlFor="practiceMode" className="flex items-center gap-1">
            <input
              id="practiceMode"
              type="checkbox"
              className="form-checkbox"
            />{" "}
            Modo Práctica
          </label>
        </div>

        <div className="border p-4 rounded space-y-3">
          <label className="block font-medium">
            Filtrado por categoría (jerárquico):
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded shadow">
              <p className="text-sm font-semibold mb-2">Leyes</p>
              {filters.laws.map((law) => (
                <label key={law.law_type} className="block">
                  <input
                    type="checkbox"
                    className="form-checkbox mr-2"
                    checked={selectedLaws.includes(law.law_type)}
                    onChange={(e) => {
                      const value = law.law_type;
                      setSelectedLaws((prev) =>
                        e.target.checked
                          ? [...prev, value]
                          : prev.filter((v) => v !== value)
                      );
                      setSelectedTitles([]);
                      setSelectedChapters([]);
                      setSelectedSections([]);
                    }}
                  />
                  {law.law_type}
                </label>
              ))}
            </div>

            {selectedLaws.length > 0 && (
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-sm font-semibold mb-2">Títulos</p>
                {availableTitles.map((t) => (
                  <label key={t.title} className="block">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={selectedTitles.includes(t.title)}
                      onChange={(e) => {
                        const value = t.title;
                        setSelectedTitles((prev) =>
                          e.target.checked
                            ? [...prev, value]
                            : prev.filter((v) => v !== value)
                        );
                        setSelectedChapters([]);
                        setSelectedSections([]);
                      }}
                    />
                    {t.title}
                  </label>
                ))}
              </div>
            )}

            {selectedTitles.length > 0 && (
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-sm font-semibold mb-2">Capítulos</p>
                {availableChapters.map((c) => (
                  <label key={c.chapter} className="block">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={selectedChapters.includes(c.chapter)}
                      onChange={(e) => {
                        const value = c.chapter;
                        setSelectedChapters((prev) =>
                          e.target.checked
                            ? [...prev, value]
                            : prev.filter((v) => v !== value)
                        );
                        setSelectedSections([]);
                      }}
                    />
                    {c.chapter}
                  </label>
                ))}
              </div>
            )}

            {selectedChapters.length > 0 && (
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-sm font-semibold mb-2">Secciones</p>
                {availableSections.map((s) => (
                  <label key={s} className="block">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={selectedSections.includes(s)}
                      onChange={(e) => {
                        const value = s;
                        setSelectedSections((prev) =>
                          e.target.checked
                            ? [...prev, value]
                            : prev.filter((v) => v !== value)
                        );
                      }}
                    />
                    {s}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="text-sm text-blue-600 underline mt-4"
          >
            Limpiar selección
          </button>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 rounded p-3">
          <p>
            <strong>Leyes:</strong> {selectedLaws.join(", ") || "Todas"}
          </p>
          <p>
            <strong>Títulos:</strong> {selectedTitles.join(", ") || "Todos"}
          </p>
          <p>
            <strong>Capítulos:</strong> {selectedChapters.join(", ") || "Todos"}
          </p>
          <p>
            <strong>Secciones:</strong> {selectedSections.join(", ") || "Todas"}
          </p>
        </div>

        <div>
          <label htmlFor="examYear" className="block font-medium">
            Año del examen (opcional):
          </label>
          <select
            id="examYear"
            className="mt-1 border rounded px-4 py-2 w-full"
          >
            <option value="">-- Sin filtro --</option>
            {filters.years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="examLocation" className="block font-medium">
            Lugar del examen (opcional):
          </label>
          <select
            id="examLocation"
            className="mt-1 border rounded px-4 py-2 w-full"
          >
            <option value="">-- Sin filtro --</option>
            {filters.cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="realExams" className="font-medium">
            Exámenes reales (opcional):
          </label>
          <input
            id="realExams"
            type="checkbox"
            className="ml-2 form-checkbox"
          />
        </div>

        <button
          className="bg-blue-600 text-white rounded px-6 py-2 mt-4 hover:bg-blue-700"
          onClick={handleStartTest}
        >
          Iniciar Test
        </button>
      </div>
    </div>
  );
};

export default Exams;
