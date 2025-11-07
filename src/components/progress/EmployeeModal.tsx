import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Employee } from "@/types/progress";
import { User, MapPin, Phone, Users, Calendar } from "lucide-react";

interface EmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
}

export const EmployeeModal = ({ employee, onClose }: EmployeeModalProps) => {
  if (!employee) return null;

  return (
    <Dialog open={!!employee} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            Employee Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employee Name</p>
                <p className="font-semibold text-lg">{employee.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-semibold">{employee.gender}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-semibold">{employee.age} years old</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-semibold">{employee.contactNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-semibold">{employee.address}</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">Employee ID: {employee.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
