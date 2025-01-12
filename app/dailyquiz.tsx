import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";

// Sample questions for the quiz
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "HyperLinks and Text Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)"],
    answer: "O(log n)",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft"],
    answer: "Facebook",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which programming language is known as the backbone of web development?",
    options: ["JavaScript", "Python", "Ruby"],
    answer: "JavaScript",
  },
];

const DailyQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex === quizQuestions.length - 1) {
      setQuizCompleted(true);
    } else {
      setTimeout(() => {
        setSelectedOption(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 1000); // Delay for user feedback
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Daily IT & Coding Quiz</Text>
      {!quizCompleted ? (
        <View>
          <Text style={styles.question}>
            Q{currentQuestionIndex + 1}: {currentQuestion.question}
          </Text>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option
                    ? option === currentQuestion.answer
                      ? styles.correctOption
                      : styles.wrongOption
                    : null,
                ]}
                onPress={() => handleOptionPress(option)}
                disabled={!!selectedOption}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedOption && (
            <Text style={styles.feedback}>
              {selectedOption === currentQuestion.answer
                ? "Correct! 🎉"
                : "Wrong! 😞"}
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.resultScore}>Your Score: {score}/{quizQuestions.length}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
            <Text style={styles.resetButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#CCCFEC",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  correctOption: {
    backgroundColor: "#4CAF50",
  },
  wrongOption: {
    backgroundColor: "#F44336",
  },
  feedback: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: "#555",
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  resultText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
  },
  resultScore: {
    fontSize: 18,
    color: "#333",
    marginVertical: 10,
  },
  resetButton: {
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DailyQuiz;
