require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configurações do banco
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS?.replace(/"/g, '') || '';
const DB_NAME = process.env.DB_NAME || 'infinity_quiz';

// Nome do arquivo de exportação com data
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const exportFile = path.join(__dirname, `${DB_NAME}_backup_${timestamp}.sql`);

console.log('🔄 Iniciando exportação do banco de dados...\n');
console.log(`📂 Banco: ${DB_NAME}`);
console.log(`💾 Arquivo: ${exportFile}\n`);

// Tenta encontrar o mysqldump no caminho padrão do Windows se não estiver no PATH
const defaultPath = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe';
const executable = fs.existsSync(defaultPath) ? `"${defaultPath}"` : 'mysqldump';

const command = `${executable} -h ${DB_HOST} -u ${DB_USER} -p"${DB_PASS}" ${DB_NAME} --result-file="${exportFile}" --single-transaction --quick --lock-tables=false`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Erro ao exportar banco de dados:');
        console.error(error.message);

        // Verificar se é problema de senha
        if (error.message.includes('Access denied')) {
            console.error('\n⚠️  Verifique suas credenciais no arquivo .env');
        }

        // Verificar se mysqldump está instalado
        if (error.message.includes('not recognized') || error.message.includes('command not found')) {
            console.error('\n⚠️  mysqldump não encontrado!');
            console.error('📝 Certifique-se de que o MySQL está instalado e no PATH do sistema.');
            console.error('   Windows: Adicione C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin ao PATH');
        }

        process.exit(1);
    }

    if (stderr && !stderr.includes('Warning')) {
        console.warn('⚠️  Avisos:', stderr);
    }

    // Verificar se o arquivo foi criado
    if (fs.existsSync(exportFile)) {
        const stats = fs.statSync(exportFile);
        const fileSizeKB = (stats.size / 1024).toFixed(2);

        console.log('✅ Banco de dados exportado com sucesso!\n');
        console.log('📊 Informações do arquivo:');
        console.log(`   - Nome: ${path.basename(exportFile)}`);
        console.log(`   - Tamanho: ${fileSizeKB} KB`);
        console.log(`   - Localização: ${exportFile}\n`);
        console.log('📤 Envie este arquivo .sql para seu colega junto com o projeto!\n');
        console.log('💡 Instruções para seu colega:');
        console.log('   1. Copiar o arquivo .sql para a pasta backend/');
        console.log('   2. Executar: node import_db.js');
    } else {
        console.error('❌ Arquivo de exportação não foi criado!');
        process.exit(1);
    }
});
