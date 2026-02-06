require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Configurações do banco
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS?.replace(/"/g, '') || '';
const DB_NAME = process.env.DB_NAME || 'infinity_quiz';

// Interface para input do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('📥 Importação do Banco de Dados\n');
console.log('🔍 Procurando arquivos .sql na pasta backend...\n');

// Listar arquivos .sql disponíveis
const backendDir = __dirname;
const sqlFiles = fs.readdirSync(backendDir)
    .filter(file => file.endsWith('.sql') && file.includes('backup'))
    .sort()
    .reverse(); // Mais recentes primeiro

if (sqlFiles.length === 0) {
    console.error('❌ Nenhum arquivo de backup encontrado!');
    console.error('📝 Certifique-se de que o arquivo .sql está na pasta backend/\n');
    console.error('💡 Dica: O arquivo deve ter um nome como: infinity_quiz_backup_2026-02-02.sql');
    process.exit(1);
}

console.log('📂 Arquivos de backup encontrados:\n');
sqlFiles.forEach((file, index) => {
    const stats = fs.statSync(path.join(backendDir, file));
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   ${index + 1}. ${file} (${fileSizeKB} KB)`);
});

console.log('\n');

// Perguntar qual arquivo importar
rl.question('Digite o número do arquivo para importar (ou Enter para usar o mais recente): ', (answer) => {
    let selectedFile;

    if (answer.trim() === '') {
        selectedFile = sqlFiles[0];
        console.log(`\n📄 Usando arquivo mais recente: ${selectedFile}\n`);
    } else {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < sqlFiles.length) {
            selectedFile = sqlFiles[index];
            console.log(`\n📄 Arquivo selecionado: ${selectedFile}\n`);
        } else {
            console.error('❌ Número inválido!');
            rl.close();
            process.exit(1);
        }
    }

    const importFile = path.join(backendDir, selectedFile);

    // Confirmar importação
    rl.question('⚠️  ATENÇÃO: Isso irá SUBSTITUIR todos os dados atuais! Continuar? (s/N): ', (confirm) => {
        if (confirm.toLowerCase() !== 's' && confirm.toLowerCase() !== 'sim') {
            console.log('❌ Importação cancelada pelo usuário.');
            rl.close();
            process.exit(0);
        }

        console.log('\n🔄 Importando banco de dados...\n');

        // Comando mysql para importar
        // Tenta encontrar o mysql no caminho padrão do Windows
        const defaultPath = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';
        const mysqlExecutable = fs.existsSync(defaultPath) ? `"${defaultPath}"` : 'mysql';

        const command = `${mysqlExecutable} -h ${DB_HOST} -u ${DB_USER} -p"${DB_PASS}" ${DB_NAME} < "${importFile}"`;

        exec(command, (error, stdout, stderr) => {
            rl.close();

            if (error) {
                console.error('❌ Erro ao importar banco de dados:');
                console.error(error.message);

                // Verificar se é problema de senha
                if (error.message.includes('Access denied')) {
                    console.error('\n⚠️  Verifique suas credenciais no arquivo .env');
                }

                // Verificar se mysql está instalado
                if (error.message.includes('not recognized') || error.message.includes('command not found')) {
                    console.error('\n⚠️  mysql não encontrado!');
                    console.error('📝 Certifique-se de que o MySQL está instalado e no PATH do sistema.');
                    console.error('   Windows: Adicione C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin ao PATH');
                }

                // Verificar se o banco existe
                if (error.message.includes('Unknown database')) {
                    console.error(`\n⚠️  Banco de dados '${DB_NAME}' não existe!`);
                    console.error('📝 Execute primeiro: node setup_db.js');
                }

                process.exit(1);
            }

            if (stderr && !stderr.includes('Warning')) {
                console.warn('⚠️  Avisos:', stderr);
            }

            console.log('✅ Banco de dados importado com sucesso!\n');
            console.log('🎉 Próximos passos:');
            console.log('   1. Verificar se o admin existe: node create_admin.js');
            console.log('   2. Iniciar o servidor: node server.js\n');
        });
    });
});
