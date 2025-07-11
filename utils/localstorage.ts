export const setItem = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
  }
};

export const removeItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
  }
};

export const cleanupQuestionCounts = (currentQuestionIds: string[]) => {
  try {
    const allKeys = Object.keys(window.localStorage);
    const countKeys = allKeys.filter((key) => key.startsWith("count_"));

    countKeys.forEach((key) => {
      const questionId = key.replace("count_", "");
      const questionExists = currentQuestionIds.includes(questionId);

      if (!questionExists) {
        window.localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error cleaning up question counts:", error);
  }
};
