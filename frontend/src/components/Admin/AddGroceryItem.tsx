import React, { useState } from 'react';
import axios from 'axios';

const AddGroceryItem: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);

  const handleSubmit = async () => {
    const newItem = { name, price, inventory };
    try {
      await axios.post('/api/groceries', newItem); // Replace with actual API endpoint
      alert('Item added successfully');
    } catch (error) {
      alert('Error adding item');
    }
  };

  return (
    <div>
      <h2>Add New Grocery Item</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} placeholder="Price" />
      <input type="number" value={inventory} onChange={(e) => setInventory(+e.target.value)} placeholder="Inventory" />
      <button onClick={handleSubmit}>Add Item</button>
    </div>
  );
};

export default AddGroceryItem;
