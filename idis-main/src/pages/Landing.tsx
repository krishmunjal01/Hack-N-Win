import { useNavigate } from "react-router-dom";
import { Shield, Activity, Brain, Radio, MapPin, ArrowRight, Building2, AlertTriangle, Users, Cpu, Wifi, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const features = [
  { icon: Brain, title: "AI-Based Risk Escalation", desc: "Machine learning models predict disaster escalation in real-time using multi-sensor fusion." },
  { icon: Radio, title: "Smart Sensor Infrastructure", desc: "Nationwide IoT sensor network monitoring temperature, gas, vibration, and structural integrity." },
  { icon: Activity, title: "Predictive Survivability Engine", desc: "Calculate remaining safe time windows with probabilistic forecasting." },
  { icon: MapPin, title: "Evacuation Automation", desc: "Auto-generated evacuation plans with floor-wise routing and occupancy tracking." },
];

const stats = [
  { value: "12,847", label: "Buildings Monitored" },
  { value: "28", label: "States Connected" },
  { value: "99.7%", label: "System Uptime" },
  { value: "<3s", label: "Alert Response Time" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className={`border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 header-scroll ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <Shield className="text-primary" size={24} />
            <span className="font-bold text-foreground tracking-tight group-hover:underline underline-offset-4 transition-all">
              National Integrated Disaster Intelligence System
            </span>
          </button>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/citizen")}>
              Citizen Portal
            </Button>
            <Button onClick={() => navigate("/auth/login")}>
              Officer Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted/30" />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-stage-safe/10 border border-stage-safe/20 rounded-full px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-stage-safe animate-pulse-glow" />
                <span className="text-xs font-medium text-stage-safe uppercase tracking-wider">System Active — All Nodes Online</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                National Integrated<br />Disaster Intelligence<br />System
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Real-time risk monitoring, AI-driven escalation prediction, and automated emergency response across the nation's critical infrastructure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/auth/login")} className="gap-2">
                  Officer Login <ArrowRight size={16} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/citizen")}>
                  Citizen Portal
                </Button>
                <Button size="lg" variant="secondary" onClick={() => navigate("/contributex")}>
                  ContriButeX Initiative
                </Button>
              </div>
            </div>
            {/* Hero Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 rounded-2xl bg-primary/5 border border-primary/10" />
                <div className="relative p-8 grid grid-cols-3 gap-4">
                  <div className="col-span-3 flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                      <Shield size={36} className="text-primary" />
                    </div>
                  </div>
                  {[
                    { icon: Cpu, label: "Sensor Grid", color: "text-stage-safe" },
                    { icon: Wifi, label: "IoT Network", color: "text-primary" },
                    { icon: BarChart3, label: "Analytics", color: "text-stage-alert" },
                    { icon: AlertTriangle, label: "Alerts", color: "text-stage-danger" },
                    { icon: Building2, label: "Buildings", color: "text-primary" },
                    { icon: MapPin, label: "Tracking", color: "text-stage-critical" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border border-border card-hover">
                      <item.icon size={24} className={item.color} />
                      <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                  {/* Connection lines visual */}
                  <div className="col-span-3 mt-2 flex justify-center">
                    <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  </div>
                  <div className="col-span-3 text-center">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">National Infrastructure Monitoring Grid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-mono font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">About IDIS</h2>
            <p className="text-muted-foreground mb-4">
              The Integrated Disaster Intelligence System is India's premier national infrastructure monitoring platform, operated by the National Disaster Management Authority (NDMA).
            </p>
            <p className="text-muted-foreground mb-4">
              IDIS integrates IoT sensor networks, artificial intelligence, and real-time communication systems to provide early warning, risk assessment, and automated emergency response for critical buildings and infrastructure nationwide.
            </p>
            <p className="text-muted-foreground">
              From seismic monitoring to fire detection, gas leak prevention to structural integrity assessment — IDIS is the backbone of India's disaster preparedness infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Building2, value: "12,847", label: "Buildings Monitored", color: "text-primary" },
              { icon: AlertTriangle, value: "156", label: "Active Alerts", color: "text-stage-alert" },
              { icon: Users, value: "4,200+", label: "Officers Active", color: "text-stage-safe" },
              { icon: Shield, value: "28", label: "States Connected", color: "text-primary" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card p-6 text-center card-hover shadow-sm">
                <s.icon className={`mx-auto ${s.color} mb-3`} size={28} />
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Key Capabilities</h2>
          <p className="text-muted-foreground text-center mb-12">Powered by cutting-edge technology for national-scale disaster intelligence</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-card p-6 card-hover shadow-sm">
                <f.icon className="text-primary mb-4" size={24} />
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="text-primary" size={20} />
                <span className="font-bold text-foreground">IDIS National</span>
              </div>
              <p className="text-sm text-muted-foreground">
                National Disaster Management Authority<br />
                Government of India
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate("/auth/login")}>Officer Portal</li>
                <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate("/citizen")}>Citizen Portal</li>
                <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate("/contributex")}>ContriButeX</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Emergency</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>National Emergency: <span className="text-stage-critical font-mono font-bold">112</span></li>
                <li>Fire: <span className="text-stage-danger font-mono font-bold">101</span></li>
                <li>Disaster Helpline: <span className="text-primary font-mono font-bold">1078</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
            © 2026 National Integrated Disaster Intelligence System — Government of India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
