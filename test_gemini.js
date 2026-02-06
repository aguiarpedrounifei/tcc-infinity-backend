require('dotenv').config();

async function testWithFetch() {
    console.log('🔍 Testando API Gemini diretamente com fetch...\n');

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key:', apiKey.substring(0, 10) + '...\n');

    // Test with the v1 API endpoint (not v1beta)
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [{
            parts: [{
                text: 'Diga olá em português'
            }]
        }]
    };

    try {
        console.log('📡 Fazendo requisição para v1 API...');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Status:', response.status, response.statusText);

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Sucesso!');
            console.log('Resposta:', JSON.stringify(data, null, 2));
        } else {
            console.log('❌ Erro na resposta:');
            console.log(JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

testWithFetch();
