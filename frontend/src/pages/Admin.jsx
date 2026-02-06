import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Trash2, Edit3, X, Save, BarChart3, Users, HelpCircle, CheckCircle, Sparkles } from 'lucide-react';

const DIFFICULTY_LABELS = {
    facil: { label: 'Fácil', color: '#10b981' },
    medio: { label: 'Médio', color: '#f59e0b' },
    dificil: { label: 'Difícil', color: '#ef4444' }
};

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filters, setFilters] = useState({ category: '', difficulty: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Form state
    const [form, setForm] = useState({
        category_id: '',
        enunciado: '',
        alternativa_a: '',
        alternativa_b: '',
        alternativa_c: '',
        alternativa_d: '',
        correta: '',
        dificuldade: 'medio'
    });

    useEffect(() => {
        // Check if user is admin
        if (!user?.isAdmin) {
            navigate('/');
            return;
        }
        fetchData();
    }, [user, navigate]);

    useEffect(() => {
        if (user?.isAdmin) {
            fetchQuestions();
        }
    }, [page, filters]);

    const fetchData = async () => {
        try {
            const [statsRes, categoriesRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/categorias')
            ]);
            setStats(statsRes.data);
            setCategories(categoriesRes.data);
            await fetchQuestions();
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestions = async () => {
        try {
            let url = `/admin/questions?page=${page}&limit=10`;
            if (filters.category) url += `&category=${filters.category}`;
            if (filters.difficulty) url += `&difficulty=${filters.difficulty}`;

            const res = await api.get(url);
            setQuestions(res.data.questions);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error('Error fetching questions:', err);
        }
    };

    const resetForm = () => {
        setForm({
            category_id: categories[0]?.id || '',
            enunciado: '',
            alternativa_a: '',
            alternativa_b: '',
            alternativa_c: '',
            alternativa_d: '',
            correta: '',
            dificuldade: 'medio'
        });
        setEditingQuestion(null);
        setError('');
        setSuccess('');
    };

    const openAddModal = () => {
        resetForm();
        setForm(prev => ({ ...prev, category_id: categories[0]?.id || '' }));
        setShowModal(true);
    };

    const openEditModal = (question) => {
        setEditingQuestion(question);
        setForm({
            category_id: question.category_id,
            enunciado: question.enunciado,
            alternativa_a: question.alternativa_a,
            alternativa_b: question.alternativa_b,
            alternativa_c: question.alternativa_c,
            alternativa_d: question.alternativa_d,
            correta: question.correta,
            dificuldade: question.dificuldade
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.correta) {
            setError('Selecione a alternativa correta');
            return;
        }

        setSaving(true);
        try {
            if (editingQuestion) {
                await api.put(`/admin/questions/${editingQuestion.id}`, form);
                setSuccess('Pergunta atualizada!');
            } else {
                await api.post('/admin/questions', form);
                setSuccess('Pergunta adicionada!');
            }
            await fetchQuestions();
            await fetchData(); // Refresh stats
            setTimeout(() => closeModal(), 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao salvar');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja deletar esta pergunta?')) return;

        try {
            await api.delete(`/admin/questions/${id}`);
            await fetchQuestions();
            await fetchData();
        } catch (err) {
            alert('Erro ao deletar pergunta');
        }
    };

    if (!user?.isAdmin) {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Acesso negado</div>;
    }

    if (loading) {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Carregando painel admin...</div>;
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 className="heading-lg" style={{ marginBottom: '2rem' }}>🛠️ Painel Administrativo</h1>

            {/* Stats Cards */}
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                            <HelpCircle size={24} color="#8b5cf6" />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalQuestions}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Perguntas</div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                            <Users size={24} color="#10b981" />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalUsers}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Usuários</div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.15)' }}>
                            <BarChart3 size={24} color="#f59e0b" />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalQuizzes}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Quizzes jogados</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button className="btn btn-primary" onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Nova Pergunta
                </button>

                <button
                    className="btn"
                    onClick={() => navigate('/generate-questions')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        color: '#fff',
                        border: 'none'
                    }}
                >
                    <Sparkles size={18} /> Gerar com IA
                </button>

                <select
                    value={filters.category}
                    onChange={(e) => { setFilters(f => ({ ...f, category: e.target.value })); setPage(1); }}
                    className="input-field"
                    style={{ width: 'auto', minWidth: '150px' }}
                >
                    <option value="">Todas Categorias</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>

                <select
                    value={filters.difficulty}
                    onChange={(e) => { setFilters(f => ({ ...f, difficulty: e.target.value })); setPage(1); }}
                    className="input-field"
                    style={{ width: 'auto', minWidth: '120px' }}
                >
                    <option value="">Todas Dificuldades</option>
                    <option value="facil">Fácil</option>
                    <option value="medio">Médio</option>
                    <option value="dificil">Difícil</option>
                </select>
            </div>

            {/* Questions Table */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-tertiary)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Pergunta</th>
                            <th style={{ padding: '1rem', width: '120px' }}>Categoria</th>
                            <th style={{ padding: '1rem', width: '100px' }}>Nível</th>
                            <th style={{ padding: '1rem', width: '100px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.length === 0 ? (
                            <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Nenhuma pergunta encontrada</td></tr>
                        ) : (
                            questions.map(q => (
                                <tr key={q.id} style={{ borderBottom: '1px solid var(--color-bg-tertiary)' }}>
                                    <td style={{ padding: '1rem', maxWidth: '400px' }}>
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.enunciado}</div>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{q.category_name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.375rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            backgroundColor: `${DIFFICULTY_LABELS[q.dificuldade]?.color}20`,
                                            color: DIFFICULTY_LABELS[q.dificuldade]?.color
                                        }}>
                                            {DIFFICULTY_LABELS[q.dificuldade]?.label}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => openEditModal(q)} style={{ padding: '0.5rem', background: 'var(--color-bg-tertiary)', borderRadius: '0.375rem', color: 'var(--color-text-primary)', border: 'none', cursor: 'pointer' }}>
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(q.id)} style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.15)', borderRadius: '0.375rem', color: 'var(--color-error)', border: 'none', cursor: 'pointer' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Anterior</button>
                    <span style={{ padding: '0.5rem 1rem', color: 'var(--color-text-secondary)' }}>Página {page} de {totalPages}</span>
                    <button className="btn btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Próxima</button>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, padding: '1rem', overflow: 'auto'
                }}>
                    <div className="card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                {editingQuestion ? '✏️ Editar Pergunta' : '➕ Nova Pergunta'}
                            </h2>
                            <button onClick={closeModal} style={{ background: 'transparent', color: 'var(--color-text-secondary)', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {error && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239,68,68,0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{error}</div>}
                        {success && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-success)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{success}</div>}

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label className="input-label">Categoria</label>
                                    <select className="input-field" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                    </select>
                                </div>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label className="input-label">Dificuldade</label>
                                    <select className="input-field" value={form.dificuldade} onChange={(e) => setForm({ ...form, dificuldade: e.target.value })} required>
                                        <option value="facil">Fácil</option>
                                        <option value="medio">Médio</option>
                                        <option value="dificil">Difícil</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Enunciado da Pergunta</label>
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    value={form.enunciado}
                                    onChange={(e) => setForm({ ...form, enunciado: e.target.value })}
                                    placeholder="Digite a pergunta..."
                                    required
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label className="input-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Alternativas (clique para marcar a correta)</label>

                                {['a', 'b', 'c', 'd'].map(letter => (
                                    <div key={letter} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, correta: `alternativa_${letter}` })}
                                            style={{
                                                width: '36px', height: '36px',
                                                borderRadius: '50%',
                                                border: form.correta === `alternativa_${letter}` ? '2px solid var(--color-success)' : '2px solid var(--color-bg-tertiary)',
                                                backgroundColor: form.correta === `alternativa_${letter}` ? 'var(--color-success)' : 'transparent',
                                                color: form.correta === `alternativa_${letter}` ? 'white' : 'var(--color-text-muted)',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0
                                            }}
                                        >
                                            {form.correta === `alternativa_${letter}` ? <CheckCircle size={18} /> : letter.toUpperCase()}
                                        </button>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={form[`alternativa_${letter}`]}
                                            onChange={(e) => setForm({ ...form, [`alternativa_${letter}`]: e.target.value })}
                                            placeholder={`Alternativa ${letter.toUpperCase()}`}
                                            required
                                            style={{ marginBottom: 0, flex: 1 }}
                                        />
                                    </div>
                                ))}
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                    Clique no círculo para marcar a alternativa correta (ficará verde)
                                </p>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
                                <Save size={16} style={{ marginRight: '0.5rem' }} />
                                {saving ? 'Salvando...' : (editingQuestion ? 'Atualizar Pergunta' : 'Adicionar Pergunta')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
