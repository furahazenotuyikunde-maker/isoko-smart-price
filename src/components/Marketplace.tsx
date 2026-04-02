import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Search } from "lucide-react";
import latestPrices from "@/data/latestPrices.json";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  const regions = useMemo(
    () => ["All", ...new Set(latestPrices.map((p: any) => p.region))],
    []
  );

  const filtered = useMemo(() => {
    return latestPrices
      .filter((p: any) => {
        const matchSearch =
          p.commodity.toLowerCase().includes(search.toLowerCase()) ||
          p.market.toLowerCase().includes(search.toLowerCase());
        const matchRegion = regionFilter === "All" || p.region === regionFilter;
        return matchSearch && matchRegion;
      })
      .sort((a: any, b: any) => b.date.localeCompare(a.date))
      .slice(0, 24);
  }, [search, regionFilter]);

  return (
    <section id="marketplace" className="py-20 bg-surface-warm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            🛒 ISOKOSMARTAI Market
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse the latest prices from markets across Rwanda.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search crops or markets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item: any, i: number) => (
              <motion.div
                key={`${item.commodity}-${item.market}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-foreground">{item.commodity}</h3>
                  <span className="font-display font-bold text-primary text-lg">
                    {item.price.toLocaleString()}
                    <span className="text-xs text-muted-foreground ml-1">RWF/{item.unit}</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {item.market}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {item.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
