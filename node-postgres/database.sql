CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  passhash VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  student_id VARCHAR(10) NOT NULL,
  enrolled_courses TEXT,
  grades TEXT
);
INSERT INTO students (name, student_id, enrolled_courses, grades)
VALUES ('John Doe', '123456', 'Math, Science', 'A, B'),
       ('Jane Smith', '789012', 'English, History', 'B, A'),
       ('Alice Johnson', '345678', 'Physics, Chemistry', 'C, A');
       
INSERT INTO users (username, pashash) VALUES ($1, $2);

INSERT INTO students (name, student_id, enrolled_courses, grades)
VALUES ('John Doe', '123456', 'Math, Science', 'A, B');