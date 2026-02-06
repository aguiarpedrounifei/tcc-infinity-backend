import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await register(username, email, password);

        if (result.success) {
            // Could modify to auto-login, but for now redirect to login with query param or just login
            navigate('/login');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '450px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="heading-lg">Create Account</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Join the Infinite Quiz challenge
                    </p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--color-error)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem'
                    }}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label" htmlFor="username">Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--color-text-muted)'
                            }} />
                            <input
                                id="username"
                                type="text"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--color-text-muted)'
                            }} />
                            <input
                                id="email"
                                type="email"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--color-text-muted)'
                            }} />
                            <input
                                id="password"
                                type="password"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginBottom: '1.5rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : (
                            <>
                                Get Started
                                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ fontWeight: '600' }}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
