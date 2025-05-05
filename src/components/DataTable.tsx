
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Columns } from "lucide-react";
import { fetchSheetData } from '@/services/googleSheetService';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DataTableProps {
  sheetUrl: string;
}

const DataTable: React.FC<DataTableProps> = ({ sheetUrl }) => {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchSheetData(sheetUrl);
        setData(result);
        
        if (result.length > 0) {
          const cols = Object.keys(result[0]);
          setColumns(cols);
          setVisibleColumns(cols);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [sheetUrl]);

  const toggleColumn = (column: string) => {
    setVisibleColumns(prev => 
      prev.includes(column) 
        ? prev.filter(col => col !== column)
        : [...prev, column]
    );
  };

  const filteredData = data.filter(row => 
    Object.entries(row).some(([key, value]) => 
      visibleColumns.includes(key) && 
      value.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Filter Data</h3>
              <Input
                placeholder="Search in table..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full"
              />
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Columns size={16} />
              <span>Columns</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 max-h-80 overflow-auto">
            <div className="space-y-4">
              <h3 className="font-medium">Toggle Columns</h3>
              <div className="grid grid-cols-2 gap-2">
                {columns.map(column => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox 
                      id={column} 
                      checked={visibleColumns.includes(column)}
                      onCheckedChange={() => toggleColumn(column)}
                    />
                    <Label htmlFor={column}>{column}</Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {visibleColumns.map((column) => (
                    <TableCell key={`${rowIndex}-${column}`}>{row[column] || '-'}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="h-24 text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
