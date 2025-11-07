import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Trash2 } from "lucide-react";
import { Employee, Task } from "@/types/progress";

interface TaskTableProps {
  tasks: Task[];
  employees: Employee[];
  onUpdateStatus: (taskId: string, status: Task["status"]) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskTable = ({ tasks, employees, onUpdateStatus, onDeleteTask }: TaskTableProps) => {
  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find((e) => e.id === employeeId);
    return employee?.name || "Unknown";
  };

  const getStatusBadge = (status: Task["status"]) => {
    const variants = {
      Done: "default",
      Ongoing: "secondary",
      Late: "destructive",
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" />
          Task Tracker
        </CardTitle>
        <CardDescription>Manage and monitor all assigned tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Task Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No tasks yet. Add a task to get started.
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow key={task.id} className="transition-smooth hover:bg-muted/30">
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell>{getEmployeeName(task.employeeId)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Select
                          value={task.status}
                          onValueChange={(value) => onUpdateStatus(task.id, value as Task["status"])}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ongoing">Ongoing</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                            <SelectItem value="Late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => onDeleteTask(task.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
