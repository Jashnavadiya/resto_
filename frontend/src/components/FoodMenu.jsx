import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Fetch all food items
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/food/getAllFoodItems');
      const items = response.data;
      
      if (Array.isArray(items)) {
        setFoodItems(items);
      } else {
        console.error("API response was not an array:", items);
        setFoodItems([]);  // Set to an empty array to avoid map errors  
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      setFoodItems([]);  // Set to an empty array to avoid map errors
    }
  };

  // Create or update a food item
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingItem) {
      // Update existing item
      try {
        const response = await axios.post('http://localhost:5000/api/v1/food/updateFoodItem', {
          id: editingItem._id,
          name,
          price,
        });
        setFoodItems(foodItems.map(item => item._id === editingItem._id ? response.data : item));
        setEditingItem(null);
      } catch (error) {
        console.error("Error updating food item:", error);
      }
    } else {
      // Create new item
      try {
        const response = await axios.post('http://localhost:5000/api/v1/food/createFoodItem', { name, price });
        setFoodItems([...foodItems, response.data]);
      } catch (error) {
        console.error("Error adding food item:", error);
      }
    }

    setName('');
    setPrice('');
  };

  // Delete a food item
  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/v1/food/deleteFoodItem', { id });
      setFoodItems(foodItems.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  // Edit a food item
  const handleEdit = (item) => {
    setName(item.name);
    setPrice(item.price);
    setEditingItem(item);
  };

  return (
    <div>
      <h1>Food Menu</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">
          {editingItem ? 'Update Food Item' : 'Add Food Item'}
        </button>
      </form>

      <div>
        {foodItems.map(item => ( 
          <div key={item._id} className="food-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;