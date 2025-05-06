
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, LineChart, TestTube, Library, User, LogOut } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  key: string;
  icon: React.ReactNode;
  active?: boolean;
}

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  
  const navItems: NavItem[] = [
    { key: 'nav.main', icon: <Home size={18} /> },
    { key: 'nav.lines', icon: <LineChart size={18} /> },
    { key: 'nav.test', icon: <TestTube size={18} /> },
    { key: 'nav.library', icon: <Library size={18} />, active: true },
    { key: 'nav.contact', icon: <User size={18} /> },
  ];

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-green-500 mr-8">OMP Team</h1>
        <nav className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.key}
              variant={item.active ? "default" : "ghost"}
              className={item.active ? "bg-navblue text-white" : "text-gray-600"}
            >
              {item.icon}
              <span className="ml-2">{t(item.key)}</span>
            </Button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSelector />
        <Button variant="ghost" className="text-gray-600">
          <LogOut size={18} />
          <span className="ml-2">{t('nav.logout')}</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
