import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRole, getRoleLabel } from "@/services/authService";
import { register } from "@/services/authService";
import { toast } from "@/hooks/use-toast";

const roles: UserRole[] = ["state_officer", "district_officer", "building_authority", "emergency_response"];

const OfficerRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "state_officer" as UserRole });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await register(form);

    if (response === "User registered successfully") {
      toast({
        title: "Registration Successful",
        description: "You can now login.",
      });

      navigate("/auth/login");
    } else {
      alert(response);
    }
  } catch (error) {
    alert("Registration failed. Server error.");
  }
};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="mx-auto text-primary mb-4" size={40} />
          <h1 className="text-2xl font-extrabold text-foreground">Officer Registration</h1>
          <p className="text-sm text-muted-foreground mt-1">Request access to IDIS National</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="officer@idis.gov.in" className="mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Role</label>
            <select
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
            >
              {roles.map((r) => (
                <option key={r} value={r}>{getRoleLabel(r)}</option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">Register & Verify</Button>
        </form>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 mx-auto" onClick={() => navigate("/auth/login")}>
          <ArrowLeft size={14} /> Back to Login
        </button>
      </div>
    </div>
  );
};

export default OfficerRegister;
