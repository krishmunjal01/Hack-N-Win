import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="mx-auto text-primary mb-4" size={40} />
          <h1 className="text-2xl font-extrabold text-foreground">OTP Verification</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit code sent to your email</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <Input
                key={i}
                id={`otp-${i}`}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-12 h-12 text-center text-lg font-mono"
                maxLength={1}
              />
            ))}
          </div>
          <Button type="submit" className="w-full">Verify</Button>
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive code? <button type="button" className="text-primary hover:underline">Resend</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
