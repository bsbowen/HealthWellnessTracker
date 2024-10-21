// backend/routes/calorieEntries.js
const express = require('express');
const router = express.Router();
const CalorieEntry = require('../models/CalorieEntry');

// POST - Create a new calorie entry
router.post('/', async (req, res) => {
    const { intake_date, meal_type, food_item, calories, protein, carbohydrates, fat, userId } = req.body;

    try {
        //Create a new entry in the database
        const newEntry = await CalorieEntry.create({
            intake_date,
            meal_type,
            food_item,
            calories,
            protein,
            carbohydrates,
            fat,
            userId
        });
        //send success response back to the client
        res.status(201).json({ message: 'Calorie entry created', entry: newEntry });
    } catch (error) {
        //send error response back to the client if something goes wrong
        res.status(400).json({ message: 'Error creating calorie entry', error: error.message });
    }
});

// GET - Retrieve all calorie entries for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all entries belonging to the specific user
        const entries = await CalorieEntry.findAll({ where: { userId } });
        res.status(200).json(entries);
    } catch (error) {
        // Handle any errors and send appropriate response
        res.status(400).json({ message: 'Error fetching calorie entries', error: error.message });
    }
});

// PUT - Update a specific calorie entry
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { intake_date, meal_type, food_item, calories, protein, carbohydrates, fat } = req.body;

    try {
        // Find the specific entry by its ID
        const entry = await CalorieEntry.findByPk(id);
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        // Update the entry's fields
        entry.intake_date = intake_date;
        entry.meal_type = meal_type;
        entry.food_item = food_item;
        entry.calories = calories;
        entry.protein = protein;
        entry.carbohydrates = carbohydrates;
        entry.fat = fat;

        // Save the updated entry
        await entry.save();
        res.status(200).json({ message: 'Entry updated successfully', entry });
    } catch (error) {
        res.status(400).json({ message: 'Error updating entry', error: error.message });
    }
});

// DELETE - Remove a calorie entry
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the specific entry by its ID
        const entry = await CalorieEntry.findByPk(id);
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        // Delete the entry
        await entry.destroy();
        res.status(200).json({ message: 'Entry deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting entry', error: error.message });
    }
});

module.exports = router;