<!DOCTYPE html>
<html>

<body>
  <h1>Student Information System Backend</h1>

  <p>This is the backend for the Student Information System application.</p>

  <h2>Getting Started</h2>
  <p>To run the backend server, follow these steps:</p>
  <ol>
    <li>Install Node.js and PostgreSQL if you haven't already.</li>
    <li>Clone this repository to your local machine.</li>
    <li>Navigate to the project directory in your terminal.</li>
    <li>Install the required dependencies by running: <code>npm install</code>.</li>
    <li>Configure your PostgreSQL connection details in the <code>database.js</code> file.</li>
    <li>Start the server by running: <code>npm start</code>.</li>
  </ol>

  <h2>Endpoints</h2>
  <p>The following API endpoints are available:</p>
  <ul>
    <li><code>POST /auth/login</code>: User login endpoint.</li>
    <li><code>POST /auth/signup</code>: User signup endpoint.</li>
    <li><code>GET /student/getAll</code>: Get all students.</li>
    <li><code>POST /student/getStudent</code>: Get a specific student by ID.</li>
    <li><code>POST /student/deleteStudent</code>: Delete a student by ID.</li>
    <li><code>POST /student/updateStudent</code>: Update an existing student by ID.</li>
    <li><code>POST /student/addStudent</code>: Add a new student.</li>
    <li><code>POST /student/searchStudentWithAll</code>: Search students by name or ID using a query parameter.</li>
  </ul>

  <h2>Database Setup</h2>
  <p>To set up the PostgreSQL database, follow these steps:</p>
  <ol>
    <li>Create a new database named "student_information_system" in PostgreSQL.</li>
    <li>Run the SQL queries provided in the <code>database.sql</code> file to create the necessary tables and insert sample data.</li>
  </ol>

  <h2>Dependencies</h2>
  <p>The backend uses the following dependencies:</p>
  <ul>
    <li><code>express</code>: Web framework for handling API requests.</li>
    <li><code>pg</code>: PostgreSQL driver for Node.js.</li>
  </ul>

  <h2>Contributing</h2>
  <p>Contributions to the project are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request.</p>

  <h2>License</h2>
  <p>This project is licensed under the MIT License - see the <code>LICENSE.md</code> file for details.</p>
</body>
</html>
