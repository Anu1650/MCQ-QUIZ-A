CREATE DATABASE mcq_db;

USE mcq_db;

CREATE TABLE questions3 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL
);

INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_option) VALUES
('What is the capital of France?', 'Berlin', 'Madrid', 'Paris', 'Rome', 'C'),
('Which language runs in a web browser?', 'Java', 'C', 'Python', 'JavaScript', 'D'),
('What does HTML stand for?', 'HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'None of the above', 'A');
