
export type AttendanceStatus = 'PRESENT' | 'EXCUSED' | 'ABSENT';

export interface Student {
  id: string;
  name: string;
  photoUrl: string;
  status: AttendanceStatus;
}
