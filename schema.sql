CREATE DATABASE IF NOT EXISTS infinity_quiz;
USE infinity_quiz;

-- Drop legacy tables if they exist to prevent conflicts
DROP TABLE IF EXISTS alternativas;
DROP TABLE IF EXISTS perguntas;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ativa BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    enunciado TEXT NOT NULL,
    alternativa_a TEXT NOT NULL,
    alternativa_b TEXT NOT NULL,
    alternativa_c TEXT NOT NULL,
    alternativa_d TEXT NOT NULL,
    correta ENUM('alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d') NOT NULL,
    dificuldade ENUM('facil', 'medio', 'dificil') DEFAULT 'medio',
    FOREIGN KEY (category_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    score INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categorias(id)
);

-- Insert default categories
INSERT IGNORE INTO categorias (id, nome) VALUES 
(1, 'Tecnologia'),
(2, 'Ciências'),
(3, 'História'),
(4, 'Conhecimentos Gerais');
