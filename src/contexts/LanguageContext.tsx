
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'vi';

// Define the context shape
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.main': 'Main',
    'nav.lines': 'Lines',
    'nav.test': 'Test',
    'nav.library': 'Library',
    'nav.contact': 'Contact',
    'nav.logout': 'Logout',
    // Page content
    'sheet.title': 'Ads.txt Library',
  },
  vi: {
    // Navbar
    'nav.main': 'Trang chủ',
    'nav.lines': 'Dòng',
    'nav.test': 'Kiểm tra',
    'nav.library': 'Thư viện',
    'nav.contact': 'Liên hệ',
    'nav.logout': 'Đăng xuất',
    // Page content
    'sheet.title': 'Thư viện Ads.txt',
  }
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
