const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate quiz questions using Google Gemini AI
 * @param {string} category - Category name (e.g., "História", "Matemática")
 * @param {string} difficulty - Difficulty level: "facil", "medio", or "dificil"
 * @param {number} quantity - Number of questions to generate (default: 10)
 * @returns {Promise<Array>} Array of generated questions
 */
exports.generateQuestions = async (category, difficulty, quantity = 10) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Map difficulty to Portuguese descriptions
        const difficultyMap = {
            facil: 'fácil (nível básico, conhecimento geral)',
            medio: 'médio (nível intermediário, requer conhecimento específico)',
            dificil: 'difícil (nível avançado, requer conhecimento profundo)'
        };

        const difficultyDescription = difficultyMap[difficulty] || difficulty;

        const prompt = `Você é um especialista em criar questões de múltipla escolha para quizzes educacionais.

Gere exatamente ${quantity} perguntas de múltipla escolha sobre o tema "${category}" com dificuldade ${difficultyDescription}.

REGRAS IMPORTANTES:
1. Cada pergunta deve ter 4 alternativas (A, B, C, D)
2. Apenas UMA alternativa deve estar correta
3. As alternativas incorretas devem ser plausíveis, mas claramente erradas
4. As perguntas devem ser claras e objetivas
5. Evite perguntas ambíguas ou com múltiplas interpretações
6. Varie os tópicos dentro da categoria
7. A resposta correta deve estar distribuída entre as alternativas (não coloque sempre na mesma posição)

Retorne APENAS um JSON válido no seguinte formato (sem markdown, sem explicações):

{
  "questions": [
    {
      "enunciado": "Texto da pergunta aqui?",
      "alternativa_a": "Primeira opção",
      "alternativa_b": "Segunda opção",
      "alternativa_c": "Terceira opção",
      "alternativa_d": "Quarta opção",
      "correta": "alternativa_a"
    }
  ]
}

IMPORTANTE: O campo "correta" deve conter exatamente: "alternativa_a", "alternativa_b", "alternativa_c" ou "alternativa_d"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean the response - remove markdown code blocks if present
        let cleanedText = text.trim();
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.replace(/```\n?/g, '');
        }

        // Parse JSON response
        const parsedResponse = JSON.parse(cleanedText);

        // Validate response structure
        if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
            throw new Error('Invalid response format from AI');
        }

        // Validate each question
        const validatedQuestions = parsedResponse.questions.map((q, index) => {
            if (!q.enunciado || !q.alternativa_a || !q.alternativa_b ||
                !q.alternativa_c || !q.alternativa_d || !q.correta) {
                throw new Error(`Question ${index + 1} is missing required fields`);
            }

            if (!['alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d'].includes(q.correta)) {
                throw new Error(`Question ${index + 1} has invalid correct answer: ${q.correta}`);
            }

            return {
                enunciado: q.enunciado.trim(),
                alternativa_a: q.alternativa_a.trim(),
                alternativa_b: q.alternativa_b.trim(),
                alternativa_c: q.alternativa_c.trim(),
                alternativa_d: q.alternativa_d.trim(),
                correta: q.correta,
                dificuldade: difficulty
            };
        });

        return validatedQuestions;

    } catch (error) {
        console.error('Error generating questions with AI:', error);
        throw new Error(`Failed to generate questions: ${error.message}`);
    }
};
