import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

const ManageInventory: React.FC = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [updatedInventory, setUpdatedInventory] = useState<number | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // Fetch grocery items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/groceries'); // Replace with your API endpoint
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching grocery items', error);
      }
    };

    fetchItems();
  }, []);

  const handleInventoryChange = (itemId: number, newInventory: number) => {
    setSelectedItemId(itemId);
    setUpdatedInventory(newInventory);
  };

  const handleUpdateInventory = async (itemId: number) => {
    if (updatedInventory !== null) {
      try {
        await axios.put(`/api/groceries/${itemId}`, { inventory: updatedInventory });
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, inventory: updatedInventory } : item
          )
        );
        alert('Inventory updated successfully!');
        setUpdatedInventory(null);
        setSelectedItemId(null);
      } catch (error) {
        alert('Error updating inventory');
        console.error('Error updating inventory:', error);
      }
    }
  };

  return (
    <div>
      <h2>Manage Inventory</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong> - ${item.price} - Current Inventory: {item.inventory}
            </div>
            {selectedItemId === item.id ? (
              <div>
                <input
                  type="number"
                  value={updatedInventory ?? item.inventory}
                  onChange={(e) => handleInventoryChange(item.id, Number(e.target.value))}
                />
                <button onClick={() => handleUpdateInventory(item.id)}>Update Inventory</button>
              </div>
            ) : (
              <button onClick={() => handleInventoryChange(item.id, item.inventory)}>
                Adjust Inventory
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageInventory;
