import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import '../styles/InstallPWA.css';

function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Previne o prompt automático do navegador
            e.preventDefault();
            // Salva o evento para usar depois
            setDeferredPrompt(e);
            // Mostra o prompt customizado
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Mostra o prompt de instalação
        deferredPrompt.prompt();

        // Aguarda a escolha do usuário
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to the install prompt: ${outcome}`);

        // Limpa o prompt
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
        // Salva no localStorage para não mostrar novamente nesta sessão
        localStorage.setItem('pwa-install-dismissed', 'true');
    };

    // Não mostra se foi dispensado anteriormente
    useEffect(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed === 'true') {
            setShowInstallPrompt(false);
        }
    }, []);

    if (!showInstallPrompt) return null;

    return (
        <div className="install-pwa-banner">
            <div className="install-pwa-content">
                <Download className="install-icon" size={24} />
                <div className="install-text">
                    <h3>Instalar App</h3>
                    <p>Instale o TCC Infinity para acesso rápido e offline</p>
                </div>
                <div className="install-actions">
                    <button onClick={handleInstallClick} className="install-btn">
                        Instalar
                    </button>
                    <button onClick={handleDismiss} className="dismiss-btn" aria-label="Dispensar">
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InstallPWA;
