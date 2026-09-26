import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  CheckCircle2,
  CheckSquare
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { mockQuizDay5 } from '../../data/mockData';

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([mockQuizDay5]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Quiz state
  const [title, setTitle] = useState('');
  const [passingScore, setPassingScore] = useState(75);
  const [xp, setXp] = useState(100);
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    },
  ]);

  const handleAddQuestionField = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
      },
    ]);
  };

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    const newQuiz = {
      id: `quiz-${Date.now()}`,
      dayId: 'day-5',
      title,
      passingScore: Number(passingScore),
      xp: Number(xp),
      questions,
    };
    setQuizzes([...quizzes, newQuiz]);
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quiz & Assessment Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Author multiple-choice knowledge checks, answer explanations, and mastery thresholds
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Create New Quiz
        </Button>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                Milestone Test
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="purple">+{quiz.xp} XP</Badge>
                <Badge variant="default">Pass: {quiz.passingScore}%</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{quiz.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {quiz.questions?.length || 4} Questions total with automated scoring
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100 text-xs">
              <div className="font-bold text-slate-700">Sample Question:</div>
              <p className="text-slate-600 italic">
                "{quiz.questions?.[0]?.question}"
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Edit Questions
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Quiz Modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title="Create New Assessment Quiz"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleCreateQuiz} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quiz Title</label>
              <input
                type="text"
                placeholder="e.g. Day 6: Tools & Security Knowledge Check"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Passing Score (%)</label>
                <input
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">XP Points</label>
                <input
                  type="number"
                  value={xp}
                  onChange={(e) => setXp(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>
            </div>

            {/* Questions Builder */}
            <div className="pt-3 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Questions ({questions.length})
                </h4>
                <Button variant="outline" size="sm" icon={Plus} onClick={handleAddQuestionField}>
                  Add Question
                </Button>
              </div>

              {questions.map((q, qIdx) => (
                <div key={qIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Question {qIdx + 1}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter question text..."
                      value={q.question}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[qIdx].question = e.target.value;
                        setQuestions(updated);
                      }}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500">
                      Options & Select Correct Answer
                    </label>
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${qIdx}`}
                          checked={q.correctAnswer === optIdx}
                          onChange={() => {
                            const updated = [...questions];
                            updated[qIdx].correctAnswer = optIdx;
                            setQuestions(updated);
                          }}
                          className="w-4 h-4 text-blue-600"
                        />
                        <input
                          type="text"
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          value={opt}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[qIdx].options[optIdx] = e.target.value;
                            setQuestions(updated);
                          }}
                          className="w-full text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Explanation for Learners
                    </label>
                    <input
                      type="text"
                      placeholder="Why is this the correct answer?"
                      value={q.explanation}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[qIdx].explanation = e.target.value;
                        setQuestions(updated);
                      }}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Publish Quiz
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
