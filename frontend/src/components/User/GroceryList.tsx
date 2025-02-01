import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

const GroceryList: React.FC = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('/api/groceries');
      setItems(response.data);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Available Grocery Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} - {item.inventory} in stock
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
