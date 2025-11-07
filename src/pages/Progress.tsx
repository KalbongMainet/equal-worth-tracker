import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import { EmployeeForm } from "@/components/progress/EmployeeForm";
import { TaskForm } from "@/components/progress/TaskForm";
import { TaskTable } from "@/components/progress/TaskTable";
import { KPILeaderboard } from "@/components/progress/KPILeaderboard";
import { EmployeeModal } from "@/components/progress/EmployeeModal";
import { Employee, Task } from "@/types/progress";

const Progress = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    const storedTasks = localStorage.getItem("tasks");
    
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      // Add demo employees
      const demoEmployees: Employee[] = [
        {
          id: "1",
          name: "Alex Johnson",
          gender: "Non-binary",
          age: 28,
          address: "123 Main St, City A",
          contactNumber: "+1-555-0101",
        },
        {
          id: "2",
          name: "Sam Rivera",
          gender: "Female",
          age: 32,
          address: "456 Oak Ave, City B",
          contactNumber: "+1-555-0102",
        },
        {
          id: "3",
          name: "Jordan Kim",
          gender: "Male",
          age: 25,
          address: "789 Pine Rd, City C",
          contactNumber: "+1-555-0103",
        },
      ];
      setEmployees(demoEmployees);
      localStorage.setItem("employees", JSON.stringify(demoEmployees));
    }
    
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50 backdrop-blur-sm bg-card/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Gender-Neutral KPI Progress Tracker</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        {/* Forms Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <EmployeeForm onAddEmployee={addEmployee} />
          <TaskForm employees={employees} onAddTask={addTask} />
        </div>

        {/* Task Tracker */}
        <TaskTable
          tasks={tasks}
          employees={employees}
          onUpdateStatus={updateTaskStatus}
          onDeleteTask={deleteTask}
        />

        {/* KPI Leaderboard */}
        <KPILeaderboard
          employees={employees}
          tasks={tasks}
          onEmployeeClick={setSelectedEmployee}
        />
      </div>

      {/* Employee Modal */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

export default Progress;
