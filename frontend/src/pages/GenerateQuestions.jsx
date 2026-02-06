import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Sparkles, Loader, Check, AlertCircle, BookOpen, Brain, Trash2 } from 'lucide-react';

const GenerateQuestions = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        categoryId: '',
        categoryName: '',
        difficulty: 'medio',
        quantity: 10
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categorias');
            setCategories(response.data);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Erro ao carregar categorias');
        }
    };

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        const selectedCategory = categories.find(c => c.id === parseInt(selectedId));
        setFormData({
            ...formData,
            categoryId: selectedId,
            categoryName: selectedCategory?.nome || ''
        });
    };

    const handleGenerateQuestions = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setGenerating(true);
        setGeneratedQuestions([]);

        try {
            const response = await api.post('/ai/generate-questions', {
                category: formData.categoryName,
                difficulty: formData.difficulty,
                quantity: parseInt(formData.quantity)
            });

            setGeneratedQuestions(response.data.questions);
            setSuccess(response.data.message);
        } catch (err) {
            console.error('Error generating questions:', err);
            setError(err.response?.data?.error || 'Erro ao gerar perguntas com IA');
        } finally {
            setGenerating(false);
        }
    };

    const handleSaveQuestions = async () => {
        if (generatedQuestions.length === 0) return;

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/ai/save-questions', {
                categoryId: parseInt(formData.categoryId),
                questions: generatedQuestions
            });

            setSuccess(response.data.message);
            setGeneratedQuestions([]);

            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({
                    categoryId: '',
                    categoryName: '',
                    difficulty: 'medio',
                    quantity: 10
                });
                setSuccess('');
            }, 2000);
        } catch (err) {
            console.error('Error saving questions:', err);
            setError(err.response?.data?.error || 'Erro ao salvar perguntas');
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveQuestion = (indexToRemove) => {
        setGeneratedQuestions(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const difficultyLabels = {
        facil: 'Fácil',
        medio: 'Médio',
        dificil: 'Difícil'
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                }}>
                    <Brain size={32} color="var(--color-primary)" />
                    <h1 className="heading-xl">Gerar Perguntas com IA</h1>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                    Use inteligência artificial para criar perguntas automaticamente
                </p>
            </header>

            {/* Form */}
            <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <form onSubmit={handleGenerateQuestions}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {/* Category */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--color-text-primary)',
                                fontWeight: '600'
                            }}>
                                Categoria
                            </label>
                            <select
                                value={formData.categoryId}
                                onChange={handleCategoryChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--color-bg-primary)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1rem'
                                }}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                                ))}
                            </select>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--color-text-primary)',
                                fontWeight: '600'
                            }}>
                                Dificuldade
                            </label>
                            <select
                                value={formData.difficulty}
                                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--color-bg-primary)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1rem'
                                }}
                            >
                                <option value="facil">Fácil</option>
                                <option value="medio">Médio</option>
                                <option value="dificil">Difícil</option>
                            </select>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--color-text-primary)',
                                fontWeight: '600'
                            }}>
                                Quantidade de Perguntas
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--color-bg-primary)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            type="submit"
                            disabled={generating || !formData.categoryId}
                            className="btn btn-primary"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}
                        >
                            {generating ? (
                                <>
                                    <Loader size={20} className="spinner" />
                                    Gerando perguntas...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Gerar Perguntas com IA
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Messages */}
            {error && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {success && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Check size={20} />
                    {success}
                </div>
            )}

            {/* Generated Questions Preview */}
            {generatedQuestions.length > 0 && (
                <div style={{
                    background: 'var(--color-bg-secondary)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <BookOpen size={24} />
                            Perguntas Geradas ({generatedQuestions.length})
                        </h2>
                        <button
                            onClick={handleSaveQuestions}
                            disabled={saving}
                            className="btn btn-success"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {saving ? (
                                <>
                                    <Loader size={18} className="spinner" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Check size={18} />
                                    Salvar no Banco
                                </>
                            )}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {generatedQuestions.map((q, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'var(--color-bg-primary)',
                                    borderRadius: '0.75rem',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <span style={{
                                        background: 'var(--color-primary)',
                                        color: '#fff',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '600'
                                    }}>
                                        #{index + 1}
                                    </span>
                                    <span style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.85rem',
                                        color: 'var(--color-text-secondary)'
                                    }}>
                                        {difficultyLabels[q.dificuldade]}
                                    </span>
                                </div>

                                <p style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    color: 'var(--color-text-primary)'
                                }}>
                                    {q.enunciado}
                                </p>

                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    {['a', 'b', 'c', 'd'].map(letter => {
                                        const isCorrect = q.correta === `alternativa_${letter}`;
                                        return (
                                            <div
                                                key={letter}
                                                style={{
                                                    padding: '0.75rem',
                                                    borderRadius: '0.5rem',
                                                    background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)',
                                                    border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <span style={{
                                                    fontWeight: '600',
                                                    color: isCorrect ? '#10b981' : 'var(--color-text-secondary)'
                                                }}>
                                                    {letter.toUpperCase()})
                                                </span>
                                                <span style={{
                                                    color: isCorrect ? '#10b981' : 'var(--color-text-primary)'
                                                }}>
                                                    {q[`alternativa_${letter}`]}
                                                </span>
                                                {isCorrect && <Check size={16} color="#10b981" />}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{
                                    marginTop: '1.5rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <button
                                        onClick={() => handleRemoveQuestion(index)}
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: '#ef4444',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                        }}
                                    >
                                        <Trash2 size={16} />
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateQuestions;
