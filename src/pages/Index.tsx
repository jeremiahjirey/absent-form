
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StudentTable from "@/components/StudentTable";
import StudentForm from "@/components/StudentForm";
import { Student } from "@/types/student";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "@/services/studentService";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  const createMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "Success",
        description: "Student added successfully",
      });
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add student",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Student, "id"> }) => 
      updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
      setIsFormOpen(false);
      setEditingStudent(undefined);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update student",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete student",
        variant: "destructive",
      });
    },
  });

  const handleAddStudent = (studentData: Omit<Student, "id">) => {
    console.log("Adding student:", studentData);
    createMutation.mutate(studentData);
  };

  const handleEditStudent = (studentData: Omit<Student, "id">) => {
    console.log("Editing student:", studentData, "Original:", editingStudent);
    if (!editingStudent) return;
    updateMutation.mutate({ id: editingStudent.id, data: studentData });
  };

  const handleDeleteStudent = (id: string) => {
    console.log("Deleting student with ID:", id);
    deleteMutation.mutate(id);
  };

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {(error as Error).message || "Failed to load students"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Class Attendance</h1>
        <Button onClick={() => setIsFormOpen(true)} disabled={createMutation.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <StudentTable
          students={students}
          onEdit={(student) => {
            setEditingStudent(student);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteStudent}
          isDeleting={deleteMutation.isPending}
        />
      )}

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingStudent(undefined);
        }}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        initialData={editingStudent}
        isSubmitting={editingStudent ? updateMutation.isPending : createMutation.isPending}
      />
    </div>
  );
};

export default Index;
