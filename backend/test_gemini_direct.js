require('dotenv').config();

async function testDirectAPI() {
    console.log('🔍 Testando API do Gemini diretamente...\n');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌ GEMINI_API_KEY não encontrada');
        process.exit(1);
    }

    console.log('✅ Chave da API encontrada\n');

    // Modelos para testar
    const modelsToTest = [
        'gemini-2.0-flash-exp',
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro'
    ];

    for (const model of modelsToTest) {
        try {
            console.log(`🧪 Testando modelo: ${model}`);

            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: 'Diga apenas "OK"'
                        }]
                    }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                const text = data.candidates[0].content.parts[0].text;

                console.log(`   ✅ SUCESSO! Modelo funciona: ${model}`);
                console.log(`   Resposta: ${text}\n`);
                console.log(`\n🎉 MODELO ENCONTRADO: ${model}`);
                console.log(`\nUse este modelo no arquivo aiService.js:\n`);
                console.log(`const model = genAI.getGenerativeModel({ model: '${model}' });\n`);
                process.exit(0);
            } else {
                const error = await response.text();
                console.log(`   ❌ Falhou: ${response.status} - ${error}\n`);
            }

        } catch (error) {
            console.log(`   ❌ Erro: ${error.message}\n`);
        }
    }

    console.log('\n❌ Nenhum modelo funcionou.');
}

testDirectAPI();
