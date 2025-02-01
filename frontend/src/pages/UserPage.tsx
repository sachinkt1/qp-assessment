import React, { useEffect, useState } from "react";
import axios from "axios";

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const UserPage: React.FC = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [cart, setCart] = useState<GroceryItem[]>([]);

  useEffect(() => {
    axios
      .get<GroceryItem[]>("/api/grocery-items")
      .then((response) => setGroceryItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const addToCart = (item: GroceryItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const handleCheckout = () => {
    console.log("Order placed:", cart);
    alert("Order placed successfully!");
    setCart([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Available Groceries</h1>
      <ul>
        {groceryItems.map((item) => (
          <li key={item.id} className="flex justify-between p-2 border-b">
            <span>{item.name} - ${item.price} (Stock: {item.stock})</span>
            <button
              onClick={() => addToCart(item)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
              disabled={item.stock === 0}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Cart ({cart.length} items)</h2>
      <button
        onClick={handleCheckout}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
        disabled={cart.length === 0}
      >
        Checkout
      </button>
    </div>
  );
};

export default UserPage;
