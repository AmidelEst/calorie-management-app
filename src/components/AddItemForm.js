import React, { useState } from 'react';
import { addCalorieItem } from '../lib/idb';

function AddItemForm() {
	const [calorieItem, setCalorieItem] = useState({
		itemName: '',
		calories: '',
		category: ' BREAKFAST', // Default category
		description: '',
	});

	const handleSubmit = async (e) => {
		// Here you would call your IndexedDB function to add the item
		console.log(calorieItem); // Temporary, for demonstration

		e.preventDefault();
		try {
			await addCalorieItem(calorieItem); // Add the item to IndexedDB
			alert('Item added successfully!');
			// Reset the form or provide feedback to the user
			setCalorieItem({
				calories: '',
				category: 'BREAKFAST',
				description: '',
			});
		} catch (error) {
			console.error('Failed to add item:', error);
			// Handle the error appropriately
			alert('Failed to add item. Please try again.');
		}

		// Reset the form or provide feedback to the user
		setCalorieItem({
			name: '',
			calories: '',
			category: ' BREAKFAST',
			description: '',
		});
		alert('Item added successfully!');
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCalorieItem((prevState) => ({
			...prevState,
			[name]: value,
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
				></input>
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
				></input>
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
				<label htmlFor="description">description</label>
				<input
					type="text"
					id="description"
					name="description"
					value={calorieItem.description}
					onChange={handleChange}
					required
				></input>
			</div>
			<button type="submit">Add Item</button>
		</form>
	);
}

export default AddItemForm;
