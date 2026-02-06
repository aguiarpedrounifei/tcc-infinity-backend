import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Edit3, Trash2, X, Save, Key } from 'lucide-react';

const Profile = () => {
    const { user: authUser, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [activeModal, setActiveModal] = useState(null); // 'name' | 'email' | 'password' | 'delete'
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Individual form fields
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/user/profile');
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const clearAllFields = () => {
        setNewName('');
        setNewEmail('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setDeletePassword('');
        setError('');
        setSuccess('');
    };

    const closeModal = () => {
        clearAllFields();
        setActiveModal(null);
    };

    const openModal = (type) => {
        clearAllFields();
        // Pre-fill with current value for name/email
        if (type === 'name') setNewName(profile?.name || '');
        if (type === 'email') setNewEmail(profile?.email || '');
        setActiveModal(type);
    };

    const handleUpdateName = async (e) => {
        e.preventDefault();
        if (!newName.trim()) {
            setError('Digite um nome');
            return;
        }

        setSaving(true);
        setError('');
        try {
            await api.put('/user/profile', { name: newName });
            setSuccess('Nome atualizado!');

            // Update localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...storedUser, name: newName }));

            await fetchProfile();
            setTimeout(() => closeModal(), 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao atualizar');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        if (!newEmail.trim()) {
            setError('Digite um email');
            return;
        }

        setSaving(true);
        setError('');
        try {
            await api.put('/user/profile', { email: newEmail });
            setSuccess('Email atualizado!');

            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...storedUser, email: newEmail }));

            await fetchProfile();
            setTimeout(() => closeModal(), 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao atualizar');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!currentPassword) {
            setError('Digite sua senha atual');
            return;
        }
        if (!newPassword) {
            setError('Digite a nova senha');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        setSaving(true);
        setError('');
        try {
            await api.put('/user/profile', { currentPassword, newPassword });
            setSuccess('Senha alterada com sucesso!');
            setTimeout(() => closeModal(), 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao atualizar senha');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            setError('Digite sua senha para confirmar');
            return;
        }

        setSaving(true);
        setError('');
        try {
            await api.delete('/user/account', { data: { password: deletePassword } });
            logout();
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao deletar conta');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Carregando perfil...</div>;

    const displayUser = profile || authUser;

    // Modal Component
    const Modal = ({ title, children, onClose }) => (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</h2>
                    <button onClick={onClose} style={{ background: 'transparent', color: 'var(--color-text-secondary)' }}>
                        <X size={22} />
                    </button>
                </div>

                {error && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239,68,68,0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                {success && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-success)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.9rem' }}>{success}</div>}

                {children}
            </div>
        </div>
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '2rem' }}>Meu Perfil</h1>

            <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {/* Avatar and Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px', height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                    }}>
                        {displayUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{displayUser?.name}</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Jogador</p>
                    </div>
                </div>

                {/* Info Cards */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)' }}>
                        <Mail color="var(--color-accent-primary)" size={20} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Email</div>
                            <div>{displayUser?.email}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)' }}>
                        <Calendar color="var(--color-accent-secondary)" size={20} />
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Membro desde</div>
                            <div>{displayUser?.created_at ? new Date(displayUser.created_at).toLocaleDateString('pt-BR') : 'N/A'}</div>
                        </div>
                    </div>
                </div>

                {/* History */}
                {displayUser?.history && displayUser.history.length > 0 && (
                    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-bg-tertiary)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Histórico Recente</h3>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {displayUser.history.slice(0, 5).map((record, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem',
                                    backgroundColor: 'var(--color-bg-primary)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.9rem'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '500' }}>{record.category_name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                            {new Date(record.date).toLocaleDateString('pt-BR')}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontWeight: 'bold',
                                        color: record.score >= 7 ? 'var(--color-success)' : 'var(--color-text-primary)'
                                    }}>
                                        {record.score}/10
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions - Separate Buttons */}
                <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-bg-tertiary)', paddingTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>⚙️ Configurações da Conta</h3>

                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <button
                            onClick={() => openModal('name')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '1rem',
                                backgroundColor: 'var(--color-bg-primary)',
                                border: '1px solid var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-bg-tertiary)'}
                        >
                            <User size={20} color="var(--color-accent-primary)" />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600' }}>Alterar Nome</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Mude seu nome de exibição</div>
                            </div>
                            <Edit3 size={16} color="var(--color-text-muted)" />
                        </button>

                        <button
                            onClick={() => openModal('email')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '1rem',
                                backgroundColor: 'var(--color-bg-primary)',
                                border: '1px solid var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-bg-tertiary)'}
                        >
                            <Mail size={20} color="var(--color-accent-primary)" />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600' }}>Alterar Email</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Mude seu endereço de email</div>
                            </div>
                            <Edit3 size={16} color="var(--color-text-muted)" />
                        </button>

                        <button
                            onClick={() => openModal('password')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '1rem',
                                backgroundColor: 'var(--color-bg-primary)',
                                border: '1px solid var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-warning)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-bg-tertiary)'}
                        >
                            <Key size={20} color="var(--color-warning)" />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600' }}>Alterar Senha</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Atualize sua senha de acesso</div>
                            </div>
                            <Edit3 size={16} color="var(--color-text-muted)" />
                        </button>

                        <button
                            onClick={() => openModal('delete')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '1rem',
                                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-error)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                marginTop: '0.5rem'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-error)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'}
                        >
                            <Trash2 size={20} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600' }}>Deletar Conta</div>
                                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Remover permanentemente sua conta</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Name Modal */}
            {activeModal === 'name' && (
                <Modal title="✏️ Alterar Nome" onClose={closeModal}>
                    <form onSubmit={handleUpdateName}>
                        <div className="input-group">
                            <label className="input-label">Novo nome</label>
                            <input
                                type="text"
                                className="input-field"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Digite seu novo nome"
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
                            {saving ? 'Salvando...' : 'Salvar Nome'}
                        </button>
                    </form>
                </Modal>
            )}

            {/* Email Modal */}
            {activeModal === 'email' && (
                <Modal title="📧 Alterar Email" onClose={closeModal}>
                    <form onSubmit={handleUpdateEmail}>
                        <div className="input-group">
                            <label className="input-label">Novo email</label>
                            <input
                                type="email"
                                className="input-field"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Digite seu novo email"
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
                            {saving ? 'Salvando...' : 'Salvar Email'}
                        </button>
                    </form>
                </Modal>
            )}

            {/* Password Modal */}
            {activeModal === 'password' && (
                <Modal title="🔐 Alterar Senha" onClose={closeModal}>
                    <form onSubmit={handleUpdatePassword}>
                        <div className="input-group">
                            <label className="input-label">Senha atual</label>
                            <input
                                type="password"
                                className="input-field"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Digite sua senha atual"
                                autoFocus
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Nova senha</label>
                            <input
                                type="password"
                                className="input-field"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Digite a nova senha"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Confirmar nova senha</label>
                            <input
                                type="password"
                                className="input-field"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirme a nova senha"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
                            {saving ? 'Salvando...' : 'Alterar Senha'}
                        </button>
                    </form>
                </Modal>
            )}

            {/* Delete Modal */}
            {activeModal === 'delete' && (
                <Modal title="⚠️ Deletar Conta" onClose={closeModal}>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        Esta ação é <strong style={{ color: 'var(--color-error)' }}>irreversível</strong>. Todos os seus dados serão permanentemente removidos.
                    </p>
                    <div className="input-group">
                        <label className="input-label">Digite sua senha para confirmar</label>
                        <input
                            type="password"
                            className="input-field"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            placeholder="Sua senha"
                            autoFocus
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={closeModal} className="btn btn-secondary" style={{ flex: 1 }}>
                            Cancelar
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            disabled={saving}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: 'var(--color-error)',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer',
                                border: 'none'
                            }}
                        >
                            {saving ? 'Deletando...' : 'Deletar'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Profile;
