import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList } from "lucide-react";
import { Employee, Task } from "@/types/progress";
import { toast } from "sonner";

interface TaskFormProps {
  employees: Employee[];
  onAddTask: (task: Task) => void;
}

export const TaskForm = ({ employees, onAddTask }: TaskFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [taskStatus, setTaskStatus] = useState<Task["status"]>("Ongoing");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName || !selectedEmployeeId) {
      toast.error("Please fill in all fields");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      employeeId: selectedEmployeeId,
      status: taskStatus,
    };

    onAddTask(newTask);
    setTaskName("");
    setSelectedEmployeeId("");
    setTaskStatus("Ongoing");
    toast.success("Task added successfully!");
  };

  return (
    <Card className="shadow-card transition-smooth hover:shadow-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-accent" />
          Add Task
        </CardTitle>
        <CardDescription>Assign a new task to an employee</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
            />
          </div>
          <div>
            <Label htmlFor="employee">Assigned Employee</Label>
            <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Task Status</Label>
            <Select value={taskStatus} onValueChange={(value) => setTaskStatus(value as Task["status"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full gradient-primary text-white">
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
