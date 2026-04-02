import { motion } from "framer-motion";
import { Smartphone, Wifi, MessageSquare, BarChart3 } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "AI Price Forecasting",
    desc: "Predict crop prices using real market data and machine learning.",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Access",
    desc: "Use ISOKOSMARTAI from any device — phone, tablet, or computer.",
  },
  {
    icon: MessageSquare,
    title: "SMS Alerts",
    desc: "Get price predictions via SMS, even without internet access.",
  },
  {
    icon: Wifi,
    title: "Location-Based Pricing",
    desc: "Compare prices across Kigali, rural markets, and all 5 provinces.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Why ISOKOSMARTAI?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            ISOKOSMARTAI is an AI-powered platform that helps farmers in Rwanda make smarter selling decisions by predicting crop prices using real market data.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border group hover:shadow-elevated transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
