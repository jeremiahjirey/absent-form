
import { API_CONFIG } from '@/config/aws-config';
import { Student } from '@/types/student';
import { ApiResponse, SingleStudentApiResponse, StudentApiResponse } from '@/types/api';

const API_URL = API_CONFIG.apiGatewayUrl;

export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await fetch(`${API_URL}/students`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch students');
    }
    
    const result: StudentApiResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch students');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const createStudent = async (student: Omit<Student, "id">): Promise<Student> => {
  try {
    const response = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create student');
    }
    
    const result: SingleStudentApiResponse = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to create student');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id: string, student: Omit<Student, "id">): Promise<Student> => {
  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update student');
    }
    
    const result: SingleStudentApiResponse = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to update student');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete student');
    }
    
    const result: ApiResponse<null> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete student');
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};
