import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="container px-3 flex items-center justify-between py-3 md:p-6">
      <div style={{ fontFamily: 'Apple Garamond' }} className="text-xl">NotasAI</div>
      <div className="flex items-center gap-2">
      </div>
    </header>
  );
};
