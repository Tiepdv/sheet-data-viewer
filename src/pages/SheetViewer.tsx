
import React from 'react';
import Navbar from '@/components/Navbar';
import DataTable from '@/components/DataTable';
import { useLanguage } from '@/contexts/LanguageContext';

const SheetViewer: React.FC = () => {
  const { t } = useLanguage();
  const sheetUrl = "https://docs.google.com/spreadsheets/d/1IO9Oc5NXABOARpqYECWKZt8BwDwxn-PdJyb0rm8UgO4/edit?gid=0";
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-darkbg">{t('sheet.title')}</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <DataTable sheetUrl={sheetUrl} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SheetViewer;
