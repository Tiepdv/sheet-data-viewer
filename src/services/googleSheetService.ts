
// Convert Google Sheet public URL to CSV export URL
const convertToExportUrl = (sheetUrl: string): string => {
  // Extract the spreadsheet ID
  const matches = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!matches || matches.length < 2) {
    throw new Error("Invalid Google Sheets URL");
  }
  
  const spreadsheetId = matches[1];
  // We can get the gid from the URL, but using 0 as default if not found
  const gidMatch = sheetUrl.match(/gid=(\d+)/);
  const gid = gidMatch ? gidMatch[1] : '0';
  
  // Construct the export URL
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
};

// Parse CSV data into array of objects
const parseCSV = (csvText: string): Record<string, string>[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));
  
  return lines.slice(1).map(line => {
    // Handle commas within quoted values
    const values: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.replace(/^"|"$/g, ''));
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Add the last value
    values.push(currentValue.replace(/^"|"$/g, ''));
    
    // Create an object with headers as keys
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    return record;
  }).filter(record => Object.values(record).some(value => value.trim() !== ''));
};

// Fetch data from Google Sheet
export const fetchSheetData = async (sheetUrl: string): Promise<Record<string, string>[]> => {
  try {
    const exportUrl = convertToExportUrl(sheetUrl);
    const response = await fetch(exportUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    throw error;
  }
};
