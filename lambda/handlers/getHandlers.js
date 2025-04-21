
const { getConnection, response, ensureStudentTable } = require('../utils/helpers');

// GET all students
async function getStudents() {
  try {
    await ensureStudentTable();
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM students');
    return response(200, { success: true, data: rows });
  } catch (error) {
    console.error("Error getting students:", error);
    return response(500, { success: false, error: "Failed to get students" });
  }
}

// GET student by ID
async function getStudentById(id) {
  try {
    await ensureStudentTable();
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM students WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return response(404, { success: false, error: "Student not found" });
    }
    
    return response(200, { success: true, data: rows[0] });
  } catch (error) {
    console.error("Error getting student:", error);
    return response(500, { success: false, error: "Failed to get student" });
  }
}

module.exports = {
  getStudents,
  getStudentById
};
