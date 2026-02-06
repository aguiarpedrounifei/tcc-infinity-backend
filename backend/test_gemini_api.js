require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
    console.log('🔍 Testando conexão com Google Gemini API...\n');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌ GEMINI_API_KEY não encontrada no arquivo .env');
        process.exit(1);
    }

    console.log('✅ Chave da API encontrada:', apiKey.substring(0, 10) + '...\n');

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        console.log('📋 Tentando listar modelos disponíveis...\n');

        // Try different model names
        const modelsToTry = [
            'gemini-pro',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'models/gemini-pro',
            'models/gemini-1.5-pro',
            'models/gemini-1.5-flash'
        ];

        for (const modelName of modelsToTry) {
            try {
                console.log(`🧪 Testando modelo: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const result = await model.generateContent('Diga apenas "OK"');
                const response = await result.response;
                const text = response.text();

                console.log(`   ✅ SUCESSO! Modelo funciona: ${modelName}`);
                console.log(`   Resposta: ${text}\n`);

                console.log(`\n🎉 MODELO ENCONTRADO: ${modelName}`);
                console.log(`\nUse este modelo no arquivo aiService.js:\n`);
                console.log(`const model = genAI.getGenerativeModel({ model: '${modelName}' });\n`);
                process.exit(0);

            } catch (error) {
                console.log(`   ❌ Falhou: ${error.message}\n`);
            }
        }

        console.log('\n❌ Nenhum modelo funcionou. Possíveis problemas:');
        console.log('   1. Chave da API inválida ou expirada');
        console.log('   2. API não habilitada no Google Cloud Console');
        console.log('   3. Região não suportada');
        console.log('\n📖 Verifique: https://ai.google.dev/gemini-api/docs/quickstart\n');

    } catch (error) {
        console.error('\n❌ Erro ao testar API:', error.message);
        console.error('\nDetalhes:', error);
    }
}

testGeminiAPI();
