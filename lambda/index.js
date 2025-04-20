
const { getStudents, getStudentById } = require('./handlers/getHandlers');
const { createStudent } = require('./handlers/postHandlers');
const { updateStudent } = require('./handlers/putHandlers');
const { deleteStudent } = require('./handlers/deleteHandlers');

// Main handler function
exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));
  
  try {
    const { httpMethod, resource, pathParameters, body } = event;
    
    // CORS preflight request
    if (httpMethod === 'OPTIONS') {
      return response(200, {});
    }
    
    // Route handling
    if (resource === '/students') {
      if (httpMethod === 'GET') {
        return await getStudents();
      } else if (httpMethod === 'POST') {
        return await createStudent(body);
      }
    } else if (resource === '/students/{id}') {
      const id = pathParameters.id;
      
      if (httpMethod === 'GET') {
        return await getStudentById(id);
      } else if (httpMethod === 'PUT') {
        return await updateStudent(id, body);
      } else if (httpMethod === 'DELETE') {
        return await deleteStudent(id);
      }
    }
    
    return response(404, { success: false, error: "Route not found" });
  } catch (error) {
    console.error("Error processing request:", error);
    return response(500, { success: false, error: "Internal server error" });
  }
};
