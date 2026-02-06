import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import {
    Cpu,
    Globe,
    Hourglass,
    Clock,
    Trophy,
    Sparkles,
    ArrowRight
} from 'lucide-react';

// Fallback categories if API fails or returns empty
const FALLBACK_CATEGORIES = [
    { id: 1, nome: 'Tecnologia' },
    { id: 2, nome: 'Ciências' },
    { id: 3, nome: 'História' },
    { id: 4, nome: 'Conhecimentos Gerais' }
];

const Home = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categorias');
                console.log('API Response:', response.data);

                // Use API response if it has data, otherwise use fallback
                if (response.data && response.data.length > 0) {
                    setCategories(response.data);
                } else {
                    console.warn('API returned empty, using fallback categories');
                    setCategories(FALLBACK_CATEGORIES);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                // Use fallback on error
                setCategories(FALLBACK_CATEGORIES);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Theme configuration for each category
    const getCategoryTheme = (name) => {
        const lowerName = name ? name.toLowerCase() : '';

        if (lowerName.includes('tecnologia')) {
            return {
                icon: <Cpu size={40} />,
                gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                border: 'rgba(147, 51, 234, 0.4)',
                accent: '#8b5cf6',
                glow: 'rgba(139, 92, 246, 0.3)',
                description: 'Desafie seus conhecimentos sobre programação, hardware e o mundo digital.'
            };
        }
        if (lowerName.includes('ciência')) {
            return {
                icon: <Globe size={40} />,
                gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
                border: 'rgba(16, 185, 129, 0.4)',
                accent: '#10b981',
                glow: 'rgba(16, 185, 129, 0.3)',
                description: 'Explore os mistérios do universo, biologia, química e física.'
            };
        }
        if (lowerName.includes('história')) {
            return {
                icon: <Hourglass size={40} />,
                gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.15))',
                border: 'rgba(245, 158, 11, 0.4)',
                accent: '#f59e0b',
                glow: 'rgba(245, 158, 11, 0.3)',
                description: 'Viaje pelo tempo e descubra os eventos que moldaram o mundo.'
            };
        }
        if (lowerName.includes('conhecimentos gerais') || lowerName.includes('geral')) {
            return {
                icon: <Sparkles size={40} />,
                gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))',
                border: 'rgba(236, 72, 153, 0.4)',
                accent: '#ec4899',
                glow: 'rgba(236, 72, 153, 0.3)',
                description: 'Teste seus conhecimentos em diversos temas e assuntos variados.'
            };
        }
        // Default
        return {
            icon: <Sparkles size={40} />,
            gradient: 'linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(71, 85, 105, 0.15))',
            border: 'rgba(148, 163, 184, 0.4)',
            accent: '#94a3b8',
            glow: 'rgba(148, 163, 184, 0.3)',
            description: 'Teste seus conhecimentos nesta categoria especial.'
        };
    };

    return (
        <div className="container" style={{ padding: '3rem 1rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div className="animate-fade-in" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '2rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Trophy size={16} color="var(--color-warning)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Daily Challenge</span>
                </div>

                <h1 className="heading-xl animate-fade-in" style={{ marginBottom: '1rem' }}>
                    Welcome back, <span className="text-gradient">{user?.name || 'Gamer'}</span>
                </h1>
                <p className="animate-fade-in" style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '1.1rem',
                    maxWidth: '500px',
                    margin: '0 auto'
                }}>
                    Escolha uma categoria e teste seus conhecimentos!
                </p>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-primary)', borderRadius: '50%' }}></div>
                        <p>Carregando categorias...</p>
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '1rem',
                    justifyContent: 'center'
                }}>
                    {categories.map((cat, index) => {
                        const theme = getCategoryTheme(cat.nome);

                        return (
                            <div
                                key={cat.id}
                                style={{
                                    position: 'relative',
                                    background: `var(--color-bg-secondary)`,
                                    backgroundImage: theme.gradient,
                                    borderRadius: '1.25rem',
                                    padding: '2rem',
                                    border: `2px solid ${theme.border}`,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                                    opacity: 0,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                                onClick={() => navigate(`/quiz/${cat.id}`)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = `0 15px 30px -10px ${theme.glow}`;
                                    e.currentTarget.style.borderColor = theme.accent;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = theme.border;
                                }}
                            >
                                {/* Background glow */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    right: '-30px',
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: theme.accent,
                                    filter: 'blur(50px)',
                                    opacity: 0.15,
                                    pointerEvents: 'none'
                                }} />

                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.25rem',
                                    color: theme.accent
                                }}>
                                    {theme.icon}
                                </div>

                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-text-primary)'
                                }}>
                                    {cat.nome}
                                </h3>

                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    flex: 1,
                                    lineHeight: '1.5',
                                    fontSize: '0.95rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    {theme.description}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                    paddingTop: '1.25rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        color: 'var(--color-text-muted)',
                                        fontSize: '0.85rem'
                                    }}>
                                        <Clock size={14} />
                                        <span>~10 min</span>
                                    </div>

                                    <button style={{
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '0.75rem',
                                        background: theme.accent,
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: '0.85rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        transition: 'all 0.2s ease',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                        Jogar
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Home;
