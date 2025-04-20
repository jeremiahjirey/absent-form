
import { Student } from './student';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface StudentApiResponse extends ApiResponse<Student[]> {}

export interface SingleStudentApiResponse extends ApiResponse<Student> {}
