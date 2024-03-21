import React, { useState } from 'react';
import { ChakraProvider, Heading,extendTheme } from "@chakra-ui/react"; // Import ChakraProvider for using Chakra UI
import AddItemForm from "../src/components/AddItemForm"; // Import the AddItemForm component
import MonthlyYearReport from "./components/MonthlyYearReport"; // Import the MonthlyYearReport component
import AppBackground from "./components/AppBackground";
import './styles/styles.css';
import ItemsTable from './components/ItemsTable'; // Import the new component

// Extend the default Chakra UI theme to set font styles
const theme = extendTheme({
	fonts: {
	  body: "Arial, sans-serif", // Set the body font to Arial or any other desired font
	  heading: "Arial, sans-serif", // Set the heading font to Arial or any other desired font
	},
  });

function App() {
  // Define state variables for managing selected month, year, and items
  const [itemsForMonthYear, setItemsForMonthYear] = useState([]);

  // Pass the itemsForMonthYear state to the MonthlyYearReport component
  const updateItemsForMonthYear = (items) => {
    setItemsForMonthYear(items);
  };

  return (
    <ChakraProvider theme={theme}>
      {/* Wrap the entire application with ChakraProvider */}
      <Heading
        fontSize="4xl"
        textAlign="center"
        color="teal.500"
        fontWeight="bold"
        mt="8"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
      >
        Welcome to the Calorie Management App!
      </Heading>

      <div className="App">
        <AppBackground> {/* Add style for full height */}
          <AddItemForm /> {/* Render the AddItemForm component */}
          <br />
          {/* Pass the updateItemsForMonthYear function as a prop to the MonthlyYearReport component */}
          <MonthlyYearReport updateItemsForMonthYear={updateItemsForMonthYear} />
        {/* Render the ItemsTable component with itemsForMonthYear as a prop */}
		<br />
        {itemsForMonthYear.length > 0 && <ItemsTable items={itemsForMonthYear} />}
		</AppBackground>
      </div>
    </ChakraProvider>
  );
}

export default App;
