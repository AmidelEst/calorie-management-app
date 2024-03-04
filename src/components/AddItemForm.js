import React, { useState } from 'react';
import { addCalorieItem } from '../lib/idb';

function AddItemForm() {
	const [calorieItem, setCalorieItem] = useState({
		itemName: '',
		calories: '',
		category: 'BREAKFAST', // Default category
		description: '',
		month: '',
		year: ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addCalorieItem(calorieItem); // Add the item to IndexedDB
			alert('Item added successfully!');
			// Reset the form or provide feedback to the user
			setCalorieItem({
				itemName: '',
				calories: '',
				category: 'BREAKFAST',
				description: '',
				month: '',
				year: ''
			});
		} catch (error) {
			console.error('Failed to add item:', error);
			// Handle the error appropriately
			alert('Failed to add item. Please try again.');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCalorieItem((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="itemName">Item Name</label>
				<input
					type="text"
					id="itemName"
					name="itemName"
					value={calorieItem.itemName}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="calories">Calories</label>
				<input
					type="number"
					id="calories"
					name="calories"
					value={calorieItem.calories}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="category">Category</label>
				<select
					id="category"
					name="category"
					value={calorieItem.category}
					onChange={handleChange}
					required
				>
					<option value="BREAKFAST">Breakfast</option>
					<option value="LUNCH">Lunch</option>
					<option value="DINNER">Dinner</option>
					<option value="OTHER">Other</option>
				</select>
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<input
					type="text"
					id="description"
					name="description"
					value={calorieItem.description}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="month">Month</label>
				<input
					type="text"
					id="month"
					name="month"
					value={calorieItem.month}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="year">Year</label>
				<input
					type="text"
					id="year"
					name="year"
					value={calorieItem.year}
					onChange={handleChange}
					required
				/>
			</div>
			<button type="submit">Add Item</button>
		</form>
	);
}

export default AddItemForm;

