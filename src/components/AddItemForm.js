/*
    developers:
        1. developer
        first name: Amit, 
        last name": Pompas, 
        id:315072397,
        2. developer
        first name: Lior, 
        last name": Bezalel, 
        id:207015249,
        3. developer
        first name: Tal, 
        last name": Brachya, 
        id:318660859,  
    
*/

import React, { useState } from 'react';
import { addCalorieItem } from '../lib/idb';
import { FormControl, FormLabel, Input, Select, Button, Box } from '@chakra-ui/react';
import '../styles/styles.css';

function AddItemForm() {
    const [calorieItem, setCalorieItem] = useState({
        itemName: '',
        calories: '',
        category: 'BREAKFAST',
        description: '',
        month: '',
        year: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate month input
        const monthValue = parseInt(calorieItem.month);
        if (!(monthValue >= 1 && monthValue <= 12)) {
            alert('Please enter a month between 1 and 12.');
            return;
        }

        // Validate year input
        if (calorieItem.year.length > 4) {
            alert('Please enter a year with maximum 4 digits.');
            return;
        }

        try {
            await addCalorieItem(calorieItem);
            alert('Item added successfully!');
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
        <Box className='custom-box'>
            <form onSubmit={handleSubmit}>
                <FormControl className='form-control'>
                    <FormLabel htmlFor='itemName'>Item Name</FormLabel>
                    <Input
                        type='text'
                        id='itemName'
                        name='itemName'
                        value={calorieItem.itemName}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl className='form-control'>
                    <FormLabel htmlFor='calories'>Calories</FormLabel>
                    <Input
                        type='number'
                        id='calories'
                        name='calories'
                        value={calorieItem.calories}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl className='form-control'>
                    <FormLabel htmlFor='category'>Category</FormLabel>
                    <Select
                        id='category'
                        name='category'
                        value={calorieItem.category}
                        onChange={handleChange}
                        required
                    >
                        <option value='BREAKFAST'>Breakfast</option>
                        <option value='LUNCH'>Lunch</option>
                        <option value='DINNER'>Dinner</option>
                        <option value='OTHER'>Other</option>
                    </Select>
                </FormControl>
                <FormControl className='form-control'>
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Input
                        type='text'
                        id='description'
                        name='description'
                        value={calorieItem.description}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl className='form-control'>
                    <FormLabel htmlFor='month'>Month</FormLabel>
                    <Input
                        type='number'
                        id='month'
                        name='month'
                        value={calorieItem.month}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl className='form-control'>
                    <FormLabel htmlFor='year'>Year</FormLabel>
                    <Input
                        type='number'
                        id='year'
                        name='year'
                        value={calorieItem.year}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <div className='form-actions'>
                    <Button type='submit'>Add Item</Button>
                </div>
            </form>
        </Box>
    );
}

export default AddItemForm;

