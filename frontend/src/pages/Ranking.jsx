import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Trophy, Medal, Crown, BarChart3, TrendingUp, Cpu, Globe, Hourglass } from 'lucide-react';

const Ranking = () => {
    const [globalRanking, setGlobalRanking] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rankingRes, statsRes] = await Promise.all([
                    api.get('/ranking/global'),
                    api.get('/user/stats')
                ]);
                setGlobalRanking(rankingRes.data || []);
                setStats(statsRes.data || []);
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown size={22} color="#fbbf24" fill="#fbbf24" />;
        if (index === 1) return <Medal size={22} color="#94a3b8" fill="#94a3b8" />;
        if (index === 2) return <Medal size={22} color="#b45309" fill="#b45309" />;
        return <span style={{ fontWeight: 'bold', color: 'var(--color-text-muted)' }}>{index + 1}</span>;
    };

    const getCategoryIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('tecnologia')) return <Cpu size={20} color="#8b5cf6" />;
        if (lowerName.includes('ciência')) return <Globe size={20} color="#10b981" />;
        if (lowerName.includes('história')) return <Hourglass size={20} color="#f59e0b" />;
        return <BarChart3 size={20} color="#94a3b8" />;
    };

    const getCategoryColor = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('tecnologia')) return '#8b5cf6';
        if (lowerName.includes('ciência')) return '#10b981';
        if (lowerName.includes('história')) return '#f59e0b';
        return '#94a3b8';
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Trophy color="var(--color-warning)" /> Ranking & Estatísticas
                </h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Veja seu desempenho e compare com outros jogadores</p>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '2rem'
            }}>
                <button
                    onClick={() => setActiveTab('dashboard')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        background: activeTab === 'dashboard' ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
                        color: activeTab === 'dashboard' ? '#fff' : 'var(--color-text-secondary)',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <BarChart3 size={18} /> Meu Desempenho
                </button>
                <button
                    onClick={() => setActiveTab('leaderboard')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        background: activeTab === 'leaderboard' ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
                        color: activeTab === 'leaderboard' ? '#fff' : 'var(--color-text-secondary)',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <TrendingUp size={18} /> Leaderboard
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    Carregando dados...
                </div>
            ) : (
                <>
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                                📊 Performance por Categoria
                            </h2>

                            {stats.length === 0 || stats.every(s => s.totalQuizzes === 0) ? (
                                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                                        Você ainda não completou nenhum quiz.
                                    </p>
                                    <p style={{ color: 'var(--color-text-secondary)' }}>
                                        Jogue algumas partidas e volte aqui para ver suas estatísticas! 🎮
                                    </p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {stats.map((stat, index) => {
                                        const color = getCategoryColor(stat.categoryName);
                                        const hasData = stat.totalQuizzes > 0;

                                        return (
                                            <div
                                                key={stat.categoryId}
                                                className="card"
                                                style={{
                                                    padding: '1.5rem',
                                                    opacity: hasData ? 1 : 0.5,
                                                    animation: `fadeIn 0.4s ease-out ${index * 0.1}s forwards`
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                                    {getCategoryIcon(stat.categoryName)}
                                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{stat.categoryName}</h3>
                                                    <span style={{
                                                        marginLeft: 'auto',
                                                        fontSize: '0.85rem',
                                                        color: 'var(--color-text-muted)'
                                                    }}>
                                                        {stat.totalQuizzes} {stat.totalQuizzes === 1 ? 'quiz' : 'quizzes'} jogados
                                                    </span>
                                                </div>

                                                {hasData ? (
                                                    <>
                                                        {/* Progress Bars */}
                                                        <div style={{ marginBottom: '1rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                                <span style={{ fontSize: '0.9rem', color: 'var(--color-success)' }}>
                                                                    ✅ Acertos: {stat.correctPercent}%
                                                                </span>
                                                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                                                    {stat.totalCorrect}/{stat.totalQuestions}
                                                                </span>
                                                            </div>
                                                            <div style={{
                                                                height: '12px',
                                                                background: 'var(--color-bg-primary)',
                                                                borderRadius: '6px',
                                                                overflow: 'hidden'
                                                            }}>
                                                                <div style={{
                                                                    width: `${stat.correctPercent}%`,
                                                                    height: '100%',
                                                                    background: `linear-gradient(90deg, ${color}, var(--color-success))`,
                                                                    borderRadius: '6px',
                                                                    transition: 'width 0.5s ease'
                                                                }} />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                                <span style={{ fontSize: '0.9rem', color: 'var(--color-error)' }}>
                                                                    ❌ Erros: {stat.wrongPercent}%
                                                                </span>
                                                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                                                    {stat.totalQuestions - stat.totalCorrect}/{stat.totalQuestions}
                                                                </span>
                                                            </div>
                                                            <div style={{
                                                                height: '12px',
                                                                background: 'var(--color-bg-primary)',
                                                                borderRadius: '6px',
                                                                overflow: 'hidden'
                                                            }}>
                                                                <div style={{
                                                                    width: `${stat.wrongPercent}%`,
                                                                    height: '100%',
                                                                    background: 'var(--color-error)',
                                                                    borderRadius: '6px',
                                                                    transition: 'width 0.5s ease'
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                                        Nenhum quiz jogado nesta categoria ainda.
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Leaderboard Tab */}
                    {activeTab === 'leaderboard' && (
                        <div className="card animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', padding: '0' }}>
                            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-bg-tertiary)' }}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: '600' }}>🏆 Top 10 Global</h2>
                            </div>

                            <div style={{ padding: '1rem' }}>
                                {globalRanking.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                                        Nenhum ranking ainda. Seja o primeiro!
                                    </div>
                                ) : (
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ textAlign: 'left', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                                                <th style={{ padding: '0.75rem', width: '60px' }}>#</th>
                                                <th style={{ padding: '0.75rem' }}>Jogador</th>
                                                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Pontos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {globalRanking.map((player, index) => (
                                                <tr key={index} style={{
                                                    borderBottom: '1px solid var(--color-bg-tertiary)',
                                                    backgroundColor: index < 3 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                                                }}>
                                                    <td style={{ padding: '0.75rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            {getRankIcon(index)}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '0.75rem', fontWeight: index < 3 ? 'bold' : 'normal' }}>
                                                        {player.name}
                                                    </td>
                                                    <td style={{
                                                        padding: '0.75rem',
                                                        textAlign: 'right',
                                                        fontWeight: 'bold',
                                                        color: 'var(--color-success)'
                                                    }}>
                                                        {player.total_score} pts
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Ranking;
