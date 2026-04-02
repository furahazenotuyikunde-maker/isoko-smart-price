import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ISOKOSMARTAI" width={36} height={36} />
          <span className="font-display text-xl font-bold text-foreground">
            ISOKO<span className="text-primary">SMART</span>AI
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium text-muted-foreground">
          <a href="#predictions" className="hover:text-primary transition-colors">Predictions</a>
          <a href="#prices" className="hover:text-primary transition-colors">Prices</a>
          <a href="#marketplace" className="hover:text-primary transition-colors">Market</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 flex flex-col gap-3 font-body text-sm">
          <a href="#predictions" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">Predictions</a>
          <a href="#prices" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">Prices</a>
          <a href="#marketplace" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">Market</a>
          <a href="#about" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
