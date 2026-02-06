import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ArrowRight, CheckCircle, XCircle, Trophy, RotateCcw, Zap, Brain, Flame, ChevronDown, ChevronUp } from 'lucide-react';

const DIFFICULTY_OPTIONS = [
    { value: 'facil', label: 'Fácil', icon: Zap, color: '#10b981', description: 'Questões básicas para iniciantes' },
    { value: 'medio', label: 'Médio', icon: Brain, color: '#f59e0b', description: 'Desafio moderado para jogadores regulares' },
    { value: 'dificil', label: 'Difícil', icon: Flame, color: '#ef4444', description: 'Teste seus limites com questões avançadas' }
];

const Quiz = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    // States
    const [phase, setPhase] = useState('select'); // 'select', 'playing', 'feedback'
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [scoreData, setScoreData] = useState(null);
    const [expandedFeedback, setExpandedFeedback] = useState({});

    const startQuiz = async () => {
        if (!selectedDifficulty) return;

        setLoading(true);
        try {
            const response = await api.get(`/quiz/${categoryId}?dificuldade=${selectedDifficulty}`);
            if (response.data.length === 0) {
                alert('Não há questões disponíveis para essa dificuldade. Tente outra!');
                setLoading(false);
                return;
            }
            setQuestions(response.data);
            setPhase('playing');
        } catch (error) {
            console.error('Failed to load quiz', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (optionKey) => {
        setAnswers(prev => ({
            ...prev,
            [questions[currentQuestionIndex].id]: optionKey
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        setSubmitting(true);
        try {
            const payload = {
                categoryId: parseInt(categoryId),
                answers: answers
            };
            const response = await api.post('/quiz/submit', payload);
            setScoreData(response.data);
            setPhase('feedback');
        } catch (error) {
            console.error('Failed to submit quiz', error);
        } finally {
            setSubmitting(false);
        }
    };

    const toggleFeedbackExpand = (questionId) => {
        setExpandedFeedback(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const restartQuiz = () => {
        setPhase('select');
        setSelectedDifficulty(null);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setScoreData(null);
        setExpandedFeedback({});
    };

    // PHASE: Difficulty Selection
    if (phase === 'select') {
        return (
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 className="heading-lg animate-fade-in" style={{ marginBottom: '0.5rem' }}>
                        Escolha a Dificuldade
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                        Selecione o nível de desafio para este quiz
                    </p>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                        {DIFFICULTY_OPTIONS.map((opt, idx) => {
                            const Icon = opt.icon;
                            const isSelected = selectedDifficulty === opt.value;

                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => setSelectedDifficulty(opt.value)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1.25rem',
                                        backgroundColor: isSelected ? `${opt.color}15` : 'var(--color-bg-secondary)',
                                        border: `2px solid ${isSelected ? opt.color : 'var(--color-bg-tertiary)'}`,
                                        borderRadius: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        animation: `fadeIn 0.4s ease-out ${idx * 0.1}s forwards`,
                                        opacity: 0,
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '0.75rem',
                                        backgroundColor: `${opt.color}20`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={24} color={opt.color} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '700', fontSize: '1.1rem', color: isSelected ? opt.color : 'var(--color-text-primary)' }}>
                                            {opt.label}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                            {opt.description}
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: `2px solid ${isSelected ? opt.color : 'var(--color-bg-tertiary)'}`,
                                        backgroundColor: isSelected ? opt.color : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {isSelected && <CheckCircle size={14} color="white" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={startQuiz}
                        disabled={!selectedDifficulty || loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            opacity: !selectedDifficulty ? 0.5 : 1
                        }}
                    >
                        {loading ? 'Carregando...' : 'Iniciar Quiz'}
                        <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </button>
                </div>
            </div>
        );
    }

    // PHASE: Playing Quiz
    if (phase === 'playing') {
        if (questions.length === 0) {
            return <div className="container" style={{ padding: '2rem' }}>Carregando questões...</div>;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const options = [
            { key: 'alternativa_a', text: currentQuestion.alternativa_a },
            { key: 'alternativa_b', text: currentQuestion.alternativa_b },
            { key: 'alternativa_c', text: currentQuestion.alternativa_c },
            { key: 'alternativa_d', text: currentQuestion.alternativa_d }
        ];
        const currentAnswer = answers[currentQuestion.id];
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        const diffOption = DIFFICULTY_OPTIONS.find(d => d.value === selectedDifficulty);

        return (
            <div className="container" style={{ padding: '2rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{
                            padding: '0.4rem 0.8rem',
                            backgroundColor: `${diffOption?.color}20`,
                            color: diffOption?.color,
                            borderRadius: '0.5rem',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>
                            {diffOption?.label}
                        </span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            {currentQuestionIndex + 1} / {questions.length}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '3px', marginBottom: '2rem', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: diffOption?.color || 'var(--color-accent-primary)', transition: 'width 0.3s ease' }} />
                    </div>

                    <div className="card animate-fade-in">
                        <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '2rem', lineHeight: '1.5' }}>
                            {currentQuestion.enunciado}
                        </h2>

                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {options.map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => handleOptionSelect(opt.key)}
                                    style={{
                                        padding: '1rem',
                                        textAlign: 'left',
                                        backgroundColor: currentAnswer === opt.key ? 'rgba(139, 92, 246, 0.1)' : 'var(--color-bg-primary)',
                                        border: `2px solid ${currentAnswer === opt.key ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        color: currentAnswer === opt.key ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                                        fontWeight: currentAnswer === opt.key ? '600' : '400',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{
                                        width: '28px', height: '28px',
                                        borderRadius: '50%',
                                        border: `2px solid ${currentAnswer === opt.key ? 'var(--color-accent-primary)' : 'var(--color-text-muted)'}`,
                                        marginRight: '1rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        flexShrink: 0
                                    }}>
                                        {opt.key.split('_')[1].toUpperCase()}
                                    </div>
                                    {opt.text}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                className="btn btn-primary"
                                onClick={handleNext}
                                disabled={!currentAnswer || submitting}
                                style={{ opacity: !currentAnswer ? 0.5 : 1 }}
                            >
                                {submitting ? 'Enviando...' : currentQuestionIndex === questions.length - 1 ? 'Finalizar Quiz' : 'Próxima'}
                                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // PHASE: Feedback
    if (phase === 'feedback' && scoreData) {
        const wrongAnswers = scoreData.feedback?.filter(f => !f.isCorrect) || [];
        const correctCount = scoreData.score;
        const totalCount = scoreData.total;
        const percentage = Math.round((correctCount / totalCount) * 100);

        let resultMessage = '';
        let resultColor = '';
        if (percentage >= 80) {
            resultMessage = '🎉 Excelente!';
            resultColor = 'var(--color-success)';
        } else if (percentage >= 50) {
            resultMessage = '👍 Bom trabalho!';
            resultColor = 'var(--color-warning)';
        } else {
            resultMessage = '💪 Continue tentando!';
            resultColor = 'var(--color-error)';
        }

        return (
            <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    {/* Score Card */}
                    <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Trophy size={48} color="var(--color-warning)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Quiz Finalizado!</h2>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: resultColor, marginBottom: '0.5rem' }}>
                            {resultMessage}
                        </p>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                            Você acertou <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{correctCount}</span> de {totalCount} questões ({percentage}%)
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                            <button className="btn btn-primary" onClick={restartQuiz}>
                                <RotateCcw size={16} style={{ marginRight: '0.5rem' }} /> Jogar Novamente
                            </button>
                            <button className="btn btn-secondary" onClick={() => navigate('/')}>
                                Voltar ao Início
                            </button>
                        </div>
                    </div>

                    {/* Feedback Details */}
                    {wrongAnswers.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <XCircle size={20} color="var(--color-error)" />
                                Questões que você errou ({wrongAnswers.length})
                            </h3>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {wrongAnswers.map((item, idx) => {
                                    const isExpanded = expandedFeedback[item.questionId];

                                    return (
                                        <div key={item.questionId} className="card" style={{ padding: '1rem' }}>
                                            <button
                                                onClick={() => toggleFeedbackExpand(item.questionId)}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: 'var(--color-text-primary)',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <span style={{ fontWeight: '600', flex: 1, paddingRight: '1rem' }}>
                                                    {idx + 1}. {item.enunciado}
                                                </span>
                                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>

                                            {isExpanded && (
                                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-bg-tertiary)' }}>
                                                    <div style={{
                                                        padding: '0.75rem',
                                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        marginBottom: '0.75rem',
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '0.5rem'
                                                    }}>
                                                        <XCircle size={18} color="var(--color-error)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                        <div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginBottom: '0.25rem' }}>Sua resposta:</div>
                                                            <div>{item.userAnswerText}</div>
                                                        </div>
                                                    </div>

                                                    <div style={{
                                                        padding: '0.75rem',
                                                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '0.5rem'
                                                    }}>
                                                        <CheckCircle size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                        <div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginBottom: '0.25rem' }}>Resposta correta:</div>
                                                            <div style={{ fontWeight: '600' }}>{item.correctAnswerText}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* All Correct Message */}
                    {wrongAnswers.length === 0 && (
                        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                            <CheckCircle size={48} color="var(--color-success)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ color: 'var(--color-success)' }}>Perfeito! Você acertou todas! 🌟</h3>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return <div className="container" style={{ padding: '2rem' }}>Carregando...</div>;
};

export default Quiz;
