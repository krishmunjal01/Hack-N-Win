import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="mx-auto text-primary mb-4" size={40} />
          <h1 className="text-2xl font-extrabold text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your registered email address</p>
        </div>
        {sent ? (
          <div className="rounded-lg border border-stage-safe/30 bg-stage-safe/5 p-6 text-center">
            <p className="text-foreground font-medium mb-2">Verification email sent</p>
            <p className="text-sm text-muted-foreground mb-4">Check your inbox for further instructions.</p>
            <Button variant="outline" onClick={() => navigate("/auth/login")}>Return to Login</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="officer@idis.gov.in" className="mt-1" required />
            </div>
            <Button type="submit" className="w-full">Send Reset Link</Button>
          </form>
        )}
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 mx-auto" onClick={() => navigate("/auth/login")}>
          <ArrowLeft size={14} /> Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
