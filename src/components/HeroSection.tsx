import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { TrendingUp, BarChart3, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>
      <div className="container relative z-10 mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 border border-primary/30">
            🌾 AI-Powered Market Intelligence
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Smart Prices.
            <br />
            <span className="text-secondary">Better Profits.</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-lg font-body leading-relaxed">
            ISOKOSMARTAI helps Rwanda's farmers predict crop prices, decide when to sell, and connect directly to buyers — powered by real market data and AI.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#predictions"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:brightness-110 transition-all shadow-elevated"
            >
              <TrendingUp size={18} />
              Get Price Prediction
            </a>
            <a
              href="#prices"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary-foreground/10 text-primary-foreground font-display font-semibold text-sm border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all backdrop-blur-sm"
            >
              <BarChart3 size={18} />
              View Market Data
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg"
        >
          {[
            { icon: TrendingUp, label: "AI Predictions", value: "95%+" },
            { icon: BarChart3, label: "Data Points", value: "108K+" },
            { icon: Users, label: "Markets", value: "39+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon size={20} className="mx-auto mb-2 text-secondary" />
              <div className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-xs text-primary-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
