import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Employee } from "@/types/progress";
import { toast } from "sonner";

interface EmployeeFormProps {
  onAddEmployee: (employee: Employee) => void;
}

export const EmployeeForm = ({ onAddEmployee }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    address: "",
    contactNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.gender || !formData.age || !formData.address || !formData.contactNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: formData.name,
      gender: formData.gender,
      age: parseInt(formData.age),
      address: formData.address,
      contactNumber: formData.contactNumber,
    };

    onAddEmployee(newEmployee);
    setFormData({ name: "", gender: "", age: "", address: "", contactNumber: "" });
    toast.success("Employee added successfully!");
  };

  return (
    <Card className="shadow-card transition-smooth hover:shadow-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-primary" />
          Add Employee
        </CardTitle>
        <CardDescription>Register a new employee in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              placeholder="Enter gender"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter age"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter address"
            />
          </div>
          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              placeholder="Enter contact number"
            />
          </div>
          <Button type="submit" className="w-full gradient-primary text-white">
            Add Employee
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
