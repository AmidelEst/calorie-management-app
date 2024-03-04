import AddItemForm from '../src/components/AddItemForm';
import MonthlyYearReport from './components/MonthlyYearReport';

function App() {
	return (
		<div className="App">
			<h1>Calorie Management App</h1>
			<AddItemForm />
			<br></br>
			<MonthlyYearReport />
		</div>
	);
}

export default App;
