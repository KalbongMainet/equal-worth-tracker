import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { Employee, Task } from "@/types/progress";

interface KPILeaderboardProps {
  employees: Employee[];
  tasks: Task[];
  onEmployeeClick: (employee: Employee) => void;
}

export const KPILeaderboard = ({ employees, tasks, onEmployeeClick }: KPILeaderboardProps) => {
  const calculateKPI = (employeeId: string) => {
    const employeeTasks = tasks.filter((task) => task.employeeId === employeeId);
    if (employeeTasks.length === 0) return { totalTasks: 0, kpiScore: 0 };

    const points = employeeTasks.reduce((acc, task) => {
      if (task.status === "Done") return acc + 2;
      if (task.status === "Ongoing") return acc + 1;
      return acc;
    }, 0);

    const maxPoints = employeeTasks.length * 2;
    const kpiScore = Math.round((points / maxPoints) * 100);

    return { totalTasks: employeeTasks.length, kpiScore };
  };

  const getKPIColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const leaderboardData = employees
    .map((employee) => ({
      employee,
      ...calculateKPI(employee.id),
    }))
    .sort((a, b) => b.kpiScore - a.kpiScore);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          KPI Leaderboard
        </CardTitle>
        <CardDescription>Performance rankings based on task completion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Rank</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Total Tasks</TableHead>
                <TableHead>KPI Score</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No employee data yet. Add employees and tasks to see the leaderboard.
                  </TableCell>
                </TableRow>
              ) : (
                leaderboardData.map((data, index) => (
                  <TableRow
                    key={data.employee.id}
                    className="transition-smooth hover:bg-muted/30 cursor-pointer"
                    onClick={() => onEmployeeClick(data.employee)}
                  >
                    <TableCell className="font-bold">
                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}
                      {index > 2 && `#${index + 1}`}
                    </TableCell>
                    <TableCell className="font-medium">{data.employee.name}</TableCell>
                    <TableCell>{data.totalTasks}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${getKPIColor(data.kpiScore)}`}>
                        {data.kpiScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={data.kpiScore} className="h-2" />
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
