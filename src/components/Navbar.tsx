
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, LineChart, TestTube, Library, User, LogOut } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const Navbar: React.FC = () => {
  const navItems: NavItem[] = [
    { label: 'Main', icon: <Home size={18} /> },
    { label: 'Lines', icon: <LineChart size={18} /> },
    { label: 'Test', icon: <TestTube size={18} /> },
    { label: 'Library', icon: <Library size={18} />, active: true },
    { label: 'Contact', icon: <User size={18} /> },
  ];

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-green-500 mr-8">OMP Team</h1>
        <nav className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={item.active ? "bg-navblue text-white" : "text-gray-600"}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
      <Button variant="ghost" className="text-gray-600">
        <LogOut size={18} />
        <span className="ml-2">Logout</span>
      </Button>
    </header>
  );
};

export default Navbar;
