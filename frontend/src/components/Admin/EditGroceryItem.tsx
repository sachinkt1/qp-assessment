import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

const EditGroceryItem: React.FC<{ id: number }> = ({ id }) => {
  const [item, setItem] = useState<GroceryItem | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get(`/api/groceries/${id}`);
      setItem(response.data);
    };
    fetchItem();
  }, [id]);

  const handleSave = async () => {
    if (item) {
      await axios.put(`/api/groceries/${id}`, item);
      alert('Item updated');
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Grocery Item</h2>
      <input value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
      <input type="number" value={item.price} onChange={(e) => setItem({ ...item, price: +e.target.value })} />
      <input type="number" value={item.inventory} onChange={(e) => setItem({ ...item, inventory: +e.target.value })} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditGroceryItem;
