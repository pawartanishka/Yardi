import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Trophy,
  RotateCcw
} from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import confetti from 'canvas-confetti';

export default function QuizPlayer({ quiz, onComplete, onClose }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Quiz content is not available.</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= (quiz.passingScore || 70);

    if (passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
      onComplete({
        score: correctCount,
        total: totalQuestions,
        percentage,
        xp: quiz.xp || 100,
      });
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= (quiz.passingScore || 70);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Knowledge Check Assessment
          </span>
          <h2 className="text-xl font-bold text-slate-900">{quiz.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" icon={Sparkles}>
            +{quiz.xp || 100} XP Reward
          </Badge>
          <Badge variant="default">
            Passing: {quiz.passingScore || 75}%
          </Badge>
        </div>
      </div>

      {!isSubmitted ? (
        <>
          {/* Progress header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span>
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>

          {/* Question Box */}
          <Card className="p-6 sm:p-8 space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-2xl border text-sm font-medium transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="md"
              icon={ArrowLeft}
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            >
              Previous
            </Button>

            {!isLastQuestion ? (
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              >
                Next Question
              </Button>
            ) : (
              <Button
                variant="success"
                size="md"
                icon={CheckCircle2}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </>
      ) : (
        /* Results Section */
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <Card className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-blue-50 text-blue-600 shadow-glow">
              {passed ? (
                <Trophy className="w-8 h-8 text-amber-500" />
              ) : (
                <AlertCircle className="w-8 h-8 text-rose-500" />
              )}
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              {passed ? 'Quiz Completed 🎉' : 'Needs Review'}
            </h3>

            <div className="flex items-center justify-center gap-6 py-2">
              <div className="text-center">
                <span className="text-xs text-slate-500 block uppercase font-bold">
                  Score
                </span>
                <span className="text-2xl font-extrabold text-slate-900">
                  {score} / {totalQuestions}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <span className="text-xs text-slate-500 block uppercase font-bold">
                  Accuracy
                </span>
                <span
                  className={`text-2xl font-extrabold ${
                    passed ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {percentage}%
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <span className="text-xs text-slate-500 block uppercase font-bold">
                  Reward
                </span>
                <span className="text-2xl font-extrabold text-purple-600">
                  {passed ? `+${quiz.xp || 100} XP` : '0 XP'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {passed
                ? 'Congratulations! You demonstrated strong mastery of this milestone topic.'
                : `You scored ${percentage}%, but ${quiz.passingScore || 75}% is required to unlock subsequent modules. You can retake the quiz anytime.`}
            </p>

            <div className="flex justify-center gap-3 pt-3">
              {!passed && (
                <Button
                  variant="outline"
                  size="md"
                  icon={RotateCcw}
                  onClick={handleRetake}
                >
                  Retake Quiz
                </Button>
              )}
              {onClose && (
                <Button variant="primary" size="md" onClick={onClose}>
                  Done & Continue
                </Button>
              )}
            </div>
          </Card>

          {/* Question by question answer review with explanations */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Detailed Answer Review</h4>
            {quiz.questions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <Card key={idx} className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-slate-500">
                      Question {idx + 1}
                    </span>
                    {isCorrect ? (
                      <Badge variant="success" icon={CheckCircle2}>
                        Correct
                      </Badge>
                    ) : (
                      <Badge variant="danger" icon={AlertCircle}>
                        Incorrect
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-800">{q.question}</p>

                  <div className="text-xs space-y-1.5 pt-1">
                    <div className="text-slate-600">
                      Your answer:{' '}
                      <span className={isCorrect ? 'font-bold text-emerald-700' : 'font-bold text-rose-700'}>
                        {q.options[userAnswer] || 'None'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-700">
                        Correct answer:{' '}
                        <span className="font-bold">{q.options[q.correctAnswer]}</span>
                      </div>
                    )}
                  </div>

                  {q.explanation && (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100 leading-relaxed">
                      <span className="font-bold text-slate-700 block mb-0.5">Explanation:</span>
                      {q.explanation}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
