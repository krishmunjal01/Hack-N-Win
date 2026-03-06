import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthContext";
import { login as loginService, verifyOTP, getCurrentUser, getRedirectPath } from "@/services/authService";
import { toast } from "@/hooks/use-toast";
const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [otpStep, setOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!email.trim() || !password.trim()) {
    setError("Please enter all fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await loginService({ email, password });

    if (response === "OTP sent") {
      setOtpStep(true);
      toast({
        title: "OTP Sent",
        description: "Check backend console for OTP (hackathon demo)",
      });
    } else {
      setError(response);
    }
  } catch (err) {
    setError("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);
    if (value && index < 5) {
      document.getElementById(`admin-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  const enteredOtp = otpInput.join("");

  try {
    const response = await verifyOTP(email, enteredOtp);

    if (response === "Login successful") {
      // Fetch actual user data from backend
      const user = await getCurrentUser(email);
      loginUser(user);
      // Role-based redirect
      navigate(getRedirectPath(user));
    } else {
      setError(response);
    }
  } catch (err) {
    setError("OTP verification failed.");
  }
};

  if (otpStep) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Shield className="mx-auto text-destructive mb-4" size={40} />
            <h1 className="text-2xl font-bold text-foreground">Admin OTP Verification</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit verification code</p>
          </div>
          <form onSubmit={handleOtpVerify} className="rounded-lg border border-destructive/20 bg-card p-6 space-y-6 shadow-sm">
            {error && <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>}
            <div className="flex justify-center gap-3">
              {otpInput.map((digit, i) => (
                <Input key={i} id={`admin-otp-${i}`} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} className="w-12 h-12 text-center text-lg font-mono" maxLength={1} />
              ))}
            </div>
            <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">Verify & Authenticate</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="mx-auto text-destructive mb-4" size={40} />
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-destructive/80">Restricted Access — National Administrators Only</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-lg border border-destructive/20 bg-card p-6 space-y-4 shadow-sm">
          {error && <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>}
          <div>
            <label className="text-sm font-medium text-foreground">Admin Email</label>
            <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="national@idis.gov" className="mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="••••••••" className="mt-1" required />
          </div>
          <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground" disabled={loading}>
            {loading ? <><Loader2 size={16} className="mr-2 animate-spin" /> Authenticating...</> : "Authenticate"}
          </Button>
        </form>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-6 mx-auto" onClick={() => navigate("/auth/login")}>
          <ArrowLeft size={14} /> Officer Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
