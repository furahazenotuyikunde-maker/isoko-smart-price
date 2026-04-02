import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight, Wheat } from "lucide-react";
import priceData from "@/data/priceData.json";
import marketsData from "@/data/markets.json";

const commodities = [...new Set(priceData.map((d: any) => d.commodity))].sort();
const regions = Object.keys(marketsData).sort();

const PricePrediction = () => {
  const [commodity, setCommodity] = useState("Maize");
  const [region, setRegion] = useState("Kigali City");
  const [predicted, setPredicted] = useState<null | { price: number; trend: string; advice: string }>(null);

  const predict = () => {
    const filtered = priceData
      .filter((d: any) => d.commodity === commodity && d.region === region)
      .sort((a: any, b: any) => a.date.localeCompare(b.date));

    if (filtered.length < 3) {
      setPredicted({ price: 0, trend: "flat", advice: "Not enough data for this selection. Try another market or crop." });
      return;
    }

    const recent = filtered.slice(-6);
    const avgRecent = recent.reduce((s: number, d: any) => s + d.price, 0) / recent.length;
    const older = filtered.slice(-12, -6);
    const avgOlder = older.length ? older.reduce((s: number, d: any) => s + d.price, 0) / older.length : avgRecent;

    const trendPct = ((avgRecent - avgOlder) / avgOlder) * 100;
    const predictedPrice = avgRecent * (1 + trendPct / 200);
    const trend = trendPct > 3 ? "up" : trendPct < -3 ? "down" : "stable";

    let advice = "";
    if (trend === "up") advice = "📈 Prices are rising. Consider holding your harvest for higher returns.";
    else if (trend === "down") advice = "📉 Prices are declining. Sell soon or find direct buyers to lock in current rates.";
    else advice = "📊 Prices are stable. Good time to sell at market rate or negotiate with buyers.";

    setPredicted({ price: Math.round(predictedPrice), trend, advice });
  };

  return (
    <section id="predictions" className="py-20 bg-surface-green">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            🌾 AI Price Prediction
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Select your crop and region to get an AI-powered price forecast and selling advice.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-display">Crop</label>
                <select
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
                >
                  {commodities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-display">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={predict}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 font-display font-semibold text-sm hover:brightness-110 transition-all"
            >
              <Wheat size={18} />
              Predict Price
              <ArrowRight size={16} />
            </button>

            {predicted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 rounded-xl bg-surface-warm border border-border"
              >
                {predicted.price > 0 ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      {predicted.trend === "up" ? (
                        <TrendingUp className="text-primary" size={28} />
                      ) : predicted.trend === "down" ? (
                        <TrendingDown className="text-destructive" size={28} />
                      ) : (
                        <ArrowRight className="text-secondary" size={28} />
                      )}
                      <div>
                        <div className="text-sm text-muted-foreground">Predicted Price</div>
                        <div className="font-display text-3xl font-bold text-foreground">
                          {predicted.price.toLocaleString()} <span className="text-base text-muted-foreground">RWF/kg</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{predicted.advice}</p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">{predicted.advice}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricePrediction;
