CREATE DATABASE sysmedicdb

USE sysmedicdb

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) DEFAULT NULL,
    is_confirmed TINYINT(1) DEFAULT 0
) 

-- Specialties Table
CREATE TABLE specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Doctors Table
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    specialty_id INT,
    FOREIGN KEY (specialty_id) REFERENCES specialties(id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);


-- Appointments Table
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    reason VARCHAR(255),
    FOREIGN KEY (patient_id) REFERENCES user(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

INSERT INTO specialties (name) VALUES ('General'), ('Cardiología'), ('Dermatología');