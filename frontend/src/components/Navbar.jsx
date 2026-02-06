import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart2, User, LogOut, Home as HomeIcon, Settings, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-bg-tertiary)',
            padding: '1rem 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: 'var(--color-accent-primary)',
                    letterSpacing: '-1px'
                }}>
                    Infinity<span style={{ color: 'var(--color-text-primary)' }}>Quiz</span>
                </Link>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <HomeIcon size={20} />
                        <span style={{ fontSize: '0.9rem' }}>Home</span>
                    </Link>

                    <Link to="/ranking" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <BarChart2 size={20} />
                        <span style={{ fontSize: '0.9rem' }}>Ranking</span>
                    </Link>

                    {user.isAdmin && (
                        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-warning)' }}>
                            <Shield size={20} />
                            <span style={{ fontSize: '0.9rem' }}>Admin</span>
                        </Link>
                    )}

                    <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <User size={20} />
                        <span style={{ fontSize: '0.9rem' }}>Profile</span>
                    </Link>

                    <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <Settings size={20} />
                        <span style={{ fontSize: '0.9rem' }}>Config</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'transparent',
                            color: 'var(--color-error)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            padding: '0.5rem'
                        }}
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
