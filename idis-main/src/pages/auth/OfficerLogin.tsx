import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthContext";
import { login, verifyOTP, getCurrentUser, getRedirectPath, AuthUser } from "@/services/authService";
import { toast } from "@/hooks/use-toast";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const OfficerLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // OTP state
  const [otpStep, setOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const result = await login({ email, password });
      if (result === "OTP sent") {
        setOtpStep(true);
        toast({ title: "OTP Sent", description: `Verification code sent to ${email}. (Check console for demo)` });
      } else {
        setError(result);
      }
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
      const next = document.getElementById(`login-otp-${index + 1}`);
      next?.focus();
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
            <Shield className="mx-auto text-primary mb-4" size={40} />
            <h1 className="text-2xl font-bold text-foreground">OTP Verification</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit code sent to {email}</p>
          </div>
          <form onSubmit={handleOtpVerify} className="rounded-lg border border-border bg-card p-6 space-y-6 shadow-sm">
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>
            )}
            <div className="flex justify-center gap-3">
              {otpInput.map((digit, i) => (
                <Input
                  key={i}
                  id={`login-otp-${i}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-12 h-12 text-center text-lg font-mono"
                  maxLength={1}
                />
              ))}
            </div>
            <Button type="submit" className="w-full">Verify & Login</Button>
            <p className="text-center text-sm text-muted-foreground">
              Didn't receive code?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => toast({ title: "OTP Resent", description: `New OTP: ${generatedOtp} (demo)` })}>
                Resend
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 animate-fade-in relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="mx-auto text-primary mb-4" size={40} />
          <h1 className="text-2xl font-bold text-foreground">{t("login")}</h1>
          <p className="text-sm text-muted-foreground mt-1">National Integrated Disaster Intelligence System</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm">
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="officer@idis.gov" className="mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="••••••••" className="mt-1" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Loader2 size={16} className="mr-2 animate-spin" /> Authenticating...</> : "Login"}
          </Button>
          <div className="flex justify-between text-sm">
            <button type="button" className="text-primary hover:underline" onClick={() => navigate("/auth/forgot-password")}>Forgot Password?</button>
            <button type="button" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => navigate("/auth/register")}>{t("register")}</button>
          </div>
          <div className="border-t border-border pt-4">
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/auth/admin-login")}>Admin Login</Button>
          </div>
        </form>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-6 mx-auto" onClick={() => navigate("/")}>
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default OfficerLogin;
