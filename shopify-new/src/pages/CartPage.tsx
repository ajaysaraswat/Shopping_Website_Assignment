import React, { useState } from "react";
import "./CartPage.css";

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, title: "Sample Product 1", quantity: 2, price: 49.99 },
    { id: 2, title: "Sample Product 2", quantity: 1, price: 99.99 },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Order placed successfully!");
    setCartItems([]);
  };

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.title}</span>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value))
              }
            />
            <span>${item.price}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
