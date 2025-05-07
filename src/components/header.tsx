import { useTheme } from "@/context/theme-provider";
import { Moon, Sun, History } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CitySearch from "./ui/city-search";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={isDark ? "/logo.png" : "/logo2.png"}
            alt="Klimate Logo"
            className="h-14"
          ></img>
        </Link>

        <div className="flex gap-4">
          <CitySearch />

          {/* theme toggle */}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500
                    ${isDark ? "rotate-180" : "rotate-0"}
                    `}
          >
            {isDark ? (
              <Sun className="h-8 w-8 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-8 w-8 text-blue-500 rotate-0 transition-all" />
            )}
          </div>

          {/* History page toggle */}
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 p-2 bg-transparent text-blue cursor-pointer transition-all duration-500"
          >
            <History className="w-8 h-8 transition-transform duration-500 hover:rotate-[-180deg]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
