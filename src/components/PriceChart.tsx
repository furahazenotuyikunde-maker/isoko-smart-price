import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import priceData from "@/data/priceData.json";

const commodities = [...new Set(priceData.map((d: any) => d.commodity))].sort();
const regions = [...new Set(priceData.map((d: any) => d.region))].sort();

const COLORS = ["#2E7D32", "#E8A317", "#1565C0", "#C62828", "#6A1B9A"];

const PriceChart = () => {
  const [commodity, setCommodity] = useState("Maize");
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["Kigali City"]);

  const chartData = useMemo(() => {
    const filtered = priceData.filter(
      (d: any) => d.commodity === commodity && selectedRegions.includes(d.region)
    );
    const byDate: Record<string, any> = {};
    filtered.forEach((d: any) => {
      if (!byDate[d.date]) byDate[d.date] = { date: d.date };
      byDate[d.date][d.region] = d.price;
    });
    return Object.values(byDate).sort((a: any, b: any) => a.date.localeCompare(b.date));
  }, [commodity, selectedRegions]);

  const toggleRegion = (r: string) => {
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  return (
    <section id="prices" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            📊 Market Price Trends
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Compare crop prices across Rwanda's regions over time.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-6 items-center">
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="rounded-lg border border-input bg-card px-4 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
            >
              {commodities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleRegion(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedRegions.includes(r)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {r.replace(" Province", "")}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 shadow-card"
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 15% 88%)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "hsl(150 10% 45%)" }}
                  tickFormatter={(v) => v.slice(2)}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(150 10% 45%)" }}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(40 20% 99%)",
                    border: "1px solid hsl(40 15% 88%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} RWF/kg`, ""]}
                />
                <Legend />
                {selectedRegions.map((r, i) => (
                  <Line
                    key={r}
                    type="monotone"
                    dataKey={r}
                    stroke={COLORS[i % COLORS.length]}
                    strokeWidth={2}
                    dot={false}
                    name={r.replace(" Province", "")}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceChart;
