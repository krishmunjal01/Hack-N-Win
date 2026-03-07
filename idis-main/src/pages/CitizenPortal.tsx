import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, Phone, BookOpen, MapPin, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const CitizenPortal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const guidelines = [
    { title: t("cp_g1_title"), steps: [t("cp_g1_s1"), t("cp_g1_s2"), t("cp_g1_s3"), t("cp_g1_s4")] },
    { title: t("cp_g2_title"), steps: [t("cp_g2_s1"), t("cp_g2_s2"), t("cp_g2_s3"), t("cp_g2_s4")] },
    { title: t("cp_g3_title"), steps: [t("cp_g3_s1"), t("cp_g3_s2"), t("cp_g3_s3"), t("cp_g3_s4")] },
    { title: t("cp_g4_title"), steps: [t("cp_g4_s1"), t("cp_g4_s2"), t("cp_g4_s3"), t("cp_g4_s4")] },
  ];

  const helplines = [
    { name: t("cp_h1"), number: "112", color: "text-stage-critical" },
    { name: t("cp_h2"), number: "101", color: "text-stage-danger" },
    { name: t("cp_h3"), number: "1078", color: "text-primary" },
    { name: t("cp_h4"), number: "108", color: "text-stage-safe" },
    { name: t("cp_h5"), number: "100", color: "text-stage-alert" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className={`border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 header-scroll ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <Shield className="text-primary" size={22} />
            <span className="font-bold text-foreground group-hover:underline underline-offset-4">{t("cp_title")}</span>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft size={14} className="mr-1" /> {t("home")}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 animate-fade-in">
        {/* Nearby Alerts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={22} className="text-stage-alert" /> {t("cp_nearby_alerts")}
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
            <BookOpen size={22} className="text-primary" /> {t("cp_safety_guidelines")}
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
            <Phone size={22} className="text-stage-critical" /> {t("cp_emergency_helplines")}
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
            <FileText size={22} className="text-primary" /> {t("cp_disaster_awareness")}
          </h2>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-bold text-foreground mb-2">{t("cp_da1_title")}</h4>
                <p>{t("cp_da1_desc")}</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">{t("cp_da2_title")}</h4>
                <p>{t("cp_da2_desc")}</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">{t("cp_da3_title")}</h4>
                <p>{t("cp_da3_desc")}</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <Button onClick={() => navigate("/contributex")} className="w-full">
                {t("cp_report_anomaly")}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CitizenPortal;
