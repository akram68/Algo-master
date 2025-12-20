import { Exercise } from "../data/exercises";
//api ai,,,,,,
export const ExerciseService = {
  async getAll(): Promise<Exercise[]> {
    return Promise.resolve([]);
  },

  async submitAnswer(exerciseId: string, answer: any) {
    return Promise.resolve({ correct: true });
  },

  async submitCode(exerciseId: string, code: string) {
    console.log("Exercise:", exerciseId);
    console.log("Code:", code);

    return Promise.resolve({
      passed: code.trim().length > 5,
      feedback: "Mock validation passed ✔️",
    });
  },
};
