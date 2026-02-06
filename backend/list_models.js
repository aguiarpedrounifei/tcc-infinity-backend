require('dotenv').config();

async function listModels() {
    console.log('🔍 Listando modelos disponíveis para sua chave API...\n');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌ GEMINI_API_KEY não encontrada');
        process.exit(1);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log('✅ Conexão bem sucedida! Modelos disponíveis:');
            if (data.models) {
                data.models.forEach(model => {
                    // Filter for generateContent supported models
                    if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                        console.log(`   - ${model.name.replace('models/', '')}`);
                    }
                });
                console.log('\nEsses são os modelos que você PODE usar.');
            } else {
                console.log('⚠️ Nenhum modelo retornado (estranho).');
                console.log('Resposta bruta:', JSON.stringify(data, null, 2));
            }
        } else {
            console.log(`❌ Erro na requisição: ${response.status}`);
            console.log('Mensagem de erro:', JSON.stringify(data, null, 2));

            if (data.error && data.error.message) {
                if (data.error.message.includes('API key not valid')) {
                    console.log('\n🚫 DIAGNÓSTICO: Sua chave de API é INVÁLIDA.');
                } else if (data.error.message.includes('API has not been used in project')) {
                    console.log('\n🚫 DIAGNÓSTICO: A API não está habilitada neste projeto.');
                }
            }
        }
    } catch (error) {
        console.error('❌ Erro de rede ou script:', error.message);
    }
}

listModels();
