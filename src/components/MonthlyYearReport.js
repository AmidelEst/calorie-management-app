import React , {useState}from 'react';
import { getAllItems } from '../lib/idb';

function MonthlyYearReport() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [itemsForMonthYear, setItemsForMonthYear] = useState([]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const fetchAndDisplayItems = async () => {
    try {
      const allItems = await getAllItems();
      const itemsFilteredByMonthYear = allItems.filter(
        (item) => item.month === selectedMonth && item.year === selectedYear
      );
      setItemsForMonthYear(itemsFilteredByMonthYear);
    } catch (error) {
      console.error('Failed to fetch items for month and year:', error);
      // Handle the error appropriately
      alert('Failed to fetch items. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="month">Month</label>
        <input
          type="text"
          id="month"
          name="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          required
        />
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <input
          type="text"
          id="year"
          name="year"
          value={selectedYear}
          onChange={handleYearChange}
          required
        />
      </div>

      <button onClick={fetchAndDisplayItems}>Display Items</button>

      {/* Display the fetched items */}
      {itemsForMonthYear.length > 0 && (
        <div>
          <h3>Items for {selectedMonth} {selectedYear}:</h3>
          <ul>
            {itemsForMonthYear.map((item) => (
              <li key={item.id}>{item.itemName} - {item.calories} calories</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MonthlyYearReport;
