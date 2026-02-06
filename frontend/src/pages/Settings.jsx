import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, Bell, Volume2, VolumeX, ChevronRight, Palette, Info } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();

    // Load settings from localStorage
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('infinityQuizSettings');
        return saved ? JSON.parse(saved) : {
            theme: 'dark',
            notifications: true,
            sound: true
        };
    });

    // Apply theme on mount and when it changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.theme);
        localStorage.setItem('infinityQuizSettings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const SettingRow = ({ icon: Icon, iconColor, title, description, children }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-bg-primary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '0.75rem'
        }}>
            <div style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                backgroundColor: `${iconColor}15`
            }}>
                <Icon size={22} color={iconColor} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{description}</div>
            </div>
            {children}
        </div>
    );

    const ToggleSwitch = ({ enabled, onToggle }) => (
        <button
            onClick={onToggle}
            style={{
                width: '52px',
                height: '28px',
                borderRadius: '14px',
                backgroundColor: enabled ? 'var(--color-success)' : 'var(--color-bg-tertiary)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s'
            }}
        >
            <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '3px',
                left: enabled ? '27px' : '3px',
                transition: 'left 0.2s'
            }} />
        </button>
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>⚙️ Configurações</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>
                Personalize sua experiência no Infinity Quiz
            </p>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {/* Appearance Section */}
                <h2 style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Palette size={18} /> Aparência
                </h2>

                <div className="card" style={{ padding: '1rem', marginBottom: '2rem' }}>
                    <SettingRow
                        icon={settings.theme === 'dark' ? Moon : Sun}
                        iconColor={settings.theme === 'dark' ? '#8b5cf6' : '#f59e0b'}
                        title="Tema"
                        description={settings.theme === 'dark' ? 'Tema escuro ativado' : 'Tema claro ativado'}
                    >
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => updateSetting('theme', 'light')}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: settings.theme === 'light' ? '2px solid var(--color-accent-primary)' : '2px solid var(--color-bg-tertiary)',
                                    backgroundColor: settings.theme === 'light' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                                    color: settings.theme === 'light' ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Sun size={16} /> Claro
                            </button>
                            <button
                                onClick={() => updateSetting('theme', 'dark')}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: settings.theme === 'dark' ? '2px solid var(--color-accent-primary)' : '2px solid var(--color-bg-tertiary)',
                                    backgroundColor: settings.theme === 'dark' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                                    color: settings.theme === 'dark' ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Moon size={16} /> Escuro
                            </button>
                        </div>
                    </SettingRow>
                </div>

                {/* Notifications Section */}
                <h2 style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bell size={18} /> Preferências
                </h2>

                <div className="card" style={{ padding: '1rem', marginBottom: '2rem' }}>
                    <SettingRow
                        icon={Bell}
                        iconColor="#10b981"
                        title="Notificações"
                        description="Receber lembretes e novidades"
                    >
                        <ToggleSwitch
                            enabled={settings.notifications}
                            onToggle={() => updateSetting('notifications', !settings.notifications)}
                        />
                    </SettingRow>

                    <SettingRow
                        icon={settings.sound ? Volume2 : VolumeX}
                        iconColor="#f59e0b"
                        title="Sons"
                        description="Efeitos sonoros durante o quiz"
                    >
                        <ToggleSwitch
                            enabled={settings.sound}
                            onToggle={() => updateSetting('sound', !settings.sound)}
                        />
                    </SettingRow>
                </div>

                {/* About Section */}
                <h2 style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Info size={18} /> Sobre
                </h2>

                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--color-accent-primary)' }}>Infinity</span>Quiz
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Versão 1.0.0</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                            Uma plataforma de quizzes interativos e educativos para testar seus conhecimentos.
                        </p>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'var(--color-bg-primary)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.85rem',
                            color: 'var(--color-text-secondary)'
                        }}>
                            <strong>TCC 2026</strong><br />
                            Desenvolvido por: Matheus, Bernardo, Breno, Lucas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
