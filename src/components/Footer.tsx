import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ISOKOSMARTAI" width={28} height={28} loading="lazy" />
          <span className="font-display text-lg font-bold text-primary-foreground">
            ISOKO<span className="text-secondary">SMART</span>AI
          </span>
        </div>
        <p className="text-sm text-primary-foreground/60 text-center max-w-md">
          Empowering Rwanda's farmers with AI-powered market intelligence. Accessible via web, mobile, and SMS.
        </p>
        <div className="text-xs text-primary-foreground/40">
          © 2026 ISOKOSMARTAI
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
