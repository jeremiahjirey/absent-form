
const { getConnection, response } = require('../utils/helpers');

// UPDATE student
async function updateStudent(id, data) {
  try {
    const { name, photoUrl, status } = JSON.parse(data);
    
    if (!name || !photoUrl || !status) {
      return response(400, { success: false, error: "Missing required fields" });
    }
    
    const conn = await getConnection();
    
    const [result] = await conn.execute(
      'UPDATE students SET name = ?, photoUrl = ?, status = ? WHERE id = ?',
      [name, photoUrl, status, id]
    );
    
    if (result.affectedRows === 0) {
      return response(404, { success: false, error: "Student not found" });
    }
    
    return response(200, { 
      success: true, 
      data: { id, name, photoUrl, status } 
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return response(500, { success: false, error: "Failed to update student" });
  }
}

module.exports = {
  updateStudent
};
