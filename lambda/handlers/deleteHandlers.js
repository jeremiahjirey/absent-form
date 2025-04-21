
const { getConnection, response, ensureStudentTable } = require('../utils/helpers');

// DELETE student
async function deleteStudent(id) {
  try {
    await ensureStudentTable();
    const conn = await getConnection();

    const [result] = await conn.execute('DELETE FROM students WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return response(404, { success: false, error: "Student not found" });
    }

    return response(200, { success: true, data: null });
  } catch (error) {
    console.error("Error deleting student:", error);
    return response(500, { success: false, error: "Failed to delete student" });
  }
}

module.exports = {
  deleteStudent
};
