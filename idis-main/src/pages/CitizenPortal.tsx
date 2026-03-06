import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, Phone, BookOpen, MapPin, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const guidelines = [
  { title: "Fire Emergency", steps: ["Stay low, crawl under smoke", "Feel doors before opening", "Use stairs, never elevators", "Call 101 immediately"] },
  { title: "Earthquake", steps: ["Drop, Cover, Hold On", "Stay away from windows", "If outdoors, move to open area", "After shaking, check for injuries"] },
  { title: "Gas Leak", steps: ["Do not use electrical switches", "Open windows for ventilation", "Evacuate immediately", "Call emergency services"] },
  { title: "Building Collapse", steps: ["If trapped, tap on surfaces", "Cover mouth with cloth", "Do not move heavy debris", "Wait for rescue teams"] },
];

const helplines = [
  { name: "National Emergency", number: "112", color: "text-stage-critical" },
  { name: "Fire Service", number: "101", color: "text-stage-danger" },
  { name: "Disaster Helpline (NDMA)", number: "1078", color: "text-primary" },
  { name: "Ambulance", number: "108", color: "text-stage-safe" },
  { name: "Police", number: "100", color: "text-stage-alert" },
];

const CitizenPortal = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className={`border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 header-scroll ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <Shield className="text-primary" size={22} />
            <span className="font-bold text-foreground group-hover:underline underline-offset-4">IDIS Citizen Portal</span>
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft size={14} className="mr-1" /> Home
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 animate-fade-in">
        {/* Nearby Alerts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={22} className="text-stage-alert" /> Nearby Alerts
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { area: "Connaught Place, Delhi", type: "Gas Leak Warning", level: "Alert", time: "12 min ago" },
              { area: "Andheri West, Mumbai", type: "Fire Detected", level: "Critical", time: "3 min ago" },
              { area: "Lajpat Nagar, Delhi", type: "Structural Risk", level: "Dangerous", time: "45 min ago" },
            ].map((a) => (
              <div key={a.area} className="rounded-lg border border-border bg-card p-4 shadow-sm card-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium uppercase tracking-wider ${a.level === "Critical" ? "text-stage-critical" : a.level === "Dangerous" ? "text-stage-danger" : "text-stage-alert"}`}>
                    {a.level}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
                <p className="font-medium text-foreground text-sm">{a.type}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin size={10} /> {a.area}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen size={22} className="text-primary" /> Safety Guidelines
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {guidelines.map((g) => (
              <div key={g.title} className="rounded-lg border border-border bg-card p-5 shadow-sm card-hover">
                <h3 className="font-bold text-foreground mb-3">{g.title}</h3>
                <ol className="space-y-1.5">
                  {g.steps.map((step, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary font-bold shrink-0">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Phone size={22} className="text-stage-critical" /> Emergency Helplines
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {helplines.map((h) => (
              <div key={h.number} className="rounded-lg border border-border bg-card p-4 text-center shadow-sm card-hover">
                <p className={`text-3xl font-mono font-bold ${h.color}`}>{h.number}</p>
                <p className="text-xs text-muted-foreground mt-2">{h.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText size={22} className="text-primary" /> Disaster Awareness
          </h2>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-bold text-foreground mb-2">Prepare Your Home</h4>
                <p>Keep emergency supplies, first-aid kits, and important documents accessible. Install smoke detectors and fire extinguishers.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Know Your Exits</h4>
                <p>Familiarize yourself with evacuation routes in your building, workplace. Practice evacuation drills regularly.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Stay Informed</h4>
                <p>Follow IDIS alerts and local emergency broadcasts. Register for NDMA SMS alerts. Keep emergency numbers saved.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CitizenPortal;
