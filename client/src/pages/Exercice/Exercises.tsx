import { useState, useEffect } from "react";
import CodeEditor from "../../components/MonacoEditor/CodeEditor";
import { ExerciseService } from "../../services/ExerciceService";
import ExerciseCard from "../../components/Exercice/ExerciseCard";
import Quiz from "../../components/Exercice/Quiz";
import { exercises as initialExercises, Exercise } from "../../data/exercises";

export default function Exercises() {
  const [exercises] = useState<Exercise[]>(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    new Set()
  );
  const [filter, setFilter] = useState<"all" | "qcm" | "quiz" | "code">("all");
  const [code, setCode] = useState("");

  // Reset code when changing exercise
  useEffect(() => {
    setCode("");
  }, [selectedExercise]);

  const handleCompleteExercise = () => {
    if (!selectedExercise) return;

    setCompletedExercises(
      new Set([...completedExercises, selectedExercise.id])
    );
  };

  const filteredExercises =
    filter === "all" ? exercises : exercises.filter((ex) => ex.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedExercise ? (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Practice Exercises
              </h1>
              <p className="text-xl text-gray-600">
                Test your knowledge with interactive exercises
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {["all", "qcm", "quiz", "code"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-5 py-2 rounded-lg font-medium ${
                    filter === type
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900 font-medium">
                Progress: {completedExercises.size} / {exercises.length}
              </p>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{
                    width: `${
                      (completedExercises.size / exercises.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onClick={() => setSelectedExercise(exercise)}
                  isCompleted={completedExercises.has(exercise.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedExercise(null)}
              className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              ← Back to Exercises
            </button>

            {(selectedExercise.type === "qcm" ||
              selectedExercise.type === "quiz") && (
              <Quiz
                exercise={selectedExercise}
                onComplete={handleCompleteExercise}
              />
            )}

            {selectedExercise.type === "code" && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedExercise.title}
                </h2>

                <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                  {selectedExercise.statement}
                </p>

                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language="javascript"
                />

                <button
                  onClick={async () => {
                    const result = await ExerciseService.submitCode(
                      selectedExercise.id,
                      code
                    );

                    if (result.passed) {
                      handleCompleteExercise();
                      alert(result.feedback);
                    }
                  }}
                  className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                >
                  Submit Code
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
