import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

const DataTable = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/weekdays')
      .then((response) => {
        const data = response.data;

        if (data.length > 0) {
          // Get the unique days of the week from the data
          const uniqueDaysOfWeek: string[] = [...new Set((data as { dayofweek: string }[]).map((row) => row.dayofweek as string))];

          // Create columns dynamically based on days of the week
          const dynamicColumns: GridColDef[] = [
            { field: 'fullName', headerName: 'Full Name', width: 200 },
            ...uniqueDaysOfWeek.map((dayOfWeek) => ({
              field: dayOfWeek.toLowerCase(),
              headerName: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
              width: 90,
            })),
          ];

          setColumns(dynamicColumns);

          // Set a default id for each row
          
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/employees')
      .then((response) => {
        // console.log('Data received:', response.data);

        const rowsWithIds = response.data.map((row: { id: number; firstname: string; lastname: string }, index: number) => ({
          ...row,
          id: index + 1,
          fullName: `${row.firstname} ${row.lastname}`,
        }));

        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/shifts')
      .then((response) => {
        const shifts = response.data;
        // console.log('Shifts Data:', response.data);
  
        if (shifts.length > 0) {
          // Update rows with actual shift names from the database
          setRows((prevRows) => {
            return prevRows.map((row: any) => {
              const shiftData: Record<string, string> = {};
              columns
                .filter((column) => column.field !== 'fullName') // Exclude fullName column
                .forEach((column) => {
                  const dayOfWeek = column.field.toLowerCase(); // Ensure lowercase for matching
                  const matchingShift = shifts.find((shift: { fullName: string; dayOfWeek: string; shiftname: string }) =>
                    shift.fullName === row.fullName && shift.dayOfWeek.toLowerCase() === dayOfWeek
                  );
                  shiftData[dayOfWeek] = matchingShift ? matchingShift.shiftname : 'shift B'; // Assign the shift name or an empty string if not found
                });
  
              console.log('Row:', row);
              console.log('Shift Data:', shiftData);
  
              return {
                ...row,
                ...shiftData,
              };
            });
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching shifts:', error);
      });
  }, [columns]);
  
  

  
  

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10} 
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default DataTable;
