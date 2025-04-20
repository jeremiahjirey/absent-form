
const { v4: uuidv4 } = require('uuid');
const { getConnection, response } = require('../utils/helpers');

// CREATE student
async function createStudent(data) {
  try {
    const { name, photoUrl, status } = JSON.parse(data);
    
    if (!name || !photoUrl || !status) {
      return response(400, { success: false, error: "Missing required fields" });
    }
    
    const id = uuidv4();
    const conn = await getConnection();
    
    await conn.execute(
      'INSERT INTO students (id, name, photoUrl, status) VALUES (?, ?, ?, ?)',
      [id, name, photoUrl, status]
    );
    
    return response(201, { 
      success: true, 
      data: { id, name, photoUrl, status } 
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return response(500, { success: false, error: "Failed to create student" });
  }
}

module.exports = {
  createStudent
};
