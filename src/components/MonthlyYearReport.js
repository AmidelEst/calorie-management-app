import React, { useState } from 'react';
import { getAllItems } from '../lib/idb';
import { FormLabel, Input, Button, Box } from '@chakra-ui/react';
import '../styles/styles.css'; // Import the CSS file

function MonthlyYearReport({ updateItemsForMonthYear }) {
  // Define state variables for managing selected month and year
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Handle changes in the selected month
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Handle changes in the selected year
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Fetch and display items for the selected month and year
  const fetchAndDisplayItems = async () => {
    try {
      // Fetch all items from IndexedDB
      const allItems = await getAllItems();
      // Filter items based on selected month and year
      const itemsFilteredByMonthYear = allItems.filter(
        (item) => item.month === selectedMonth && item.year === selectedYear
      );
      // Update state with filtered items
      updateItemsForMonthYear(itemsFilteredByMonthYear);
      // Show alert if there are no items
      if (itemsFilteredByMonthYear.length === 0) {
        alert('No items to display.');
      }
    } catch (error) {
      console.error('Failed to fetch items for month and year:', error);
      // Handle the error appropriately
      alert('Failed to fetch items. Please try again.');
    }
  };

  return (
    <div className='custom-box'> {/* Apply custom styling */}
      <div className='form-control'>
        <FormLabel htmlFor='month'>Month</FormLabel>
        <Input
          type='number'
          id='month'
          name='month'
          value={selectedMonth}
          onChange={handleMonthChange}
          required />
      </div>

      <div className='form-control'>
        <FormLabel htmlFor='year'>Year</FormLabel>
        <Input
          type='number'
          id='year'
          name='year'
          value={selectedYear}
          onChange={handleYearChange}
          required />
      </div>

      <div className='form-actions'>
        <Button onClick={fetchAndDisplayItems}>Display Items</Button>
      </div>
    </div>
  );
}

export default MonthlyYearReport;
