import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditGroceryItem from './EditGroceryItem';

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

const GroceryItemList: React.FC = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('/api/groceries');
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/groceries/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      alert('Error deleting item');
    }
  };

  return (
    <div>
      <h2>Grocery Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} - {item.inventory}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button><EditGroceryItem id={item.id} /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryItemList;
