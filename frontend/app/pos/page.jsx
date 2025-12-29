'use client';
import { useEffect, useState } from 'react';

export default function POSPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setItems([
      { id: 1, name: "Pizza", price: 200, description: "Cheesy pizza" },
      { id: 2, name: "Burger", price: 150, description: "Beef burger" },
      { id: 3, name: "Pasta", price: 180, description: "White sauce pasta" },
    ]);
  }, []);

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) {
        return prev.map(p =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateQty(id, qty) {
    setCart(prev =>
      prev
        .map(p => (p.id === id ? { ...p, qty } : p))
        .filter(p => p.qty > 0)
    );
  }

  function checkout() {
    const receipt = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastReceipt", JSON.stringify(receipt));
    alert("Order placed. Receipt saved in localStorage.");
    setCart([]);
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* MENU */}
      <section className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <div className="grid grid-cols-2 gap-3">
          {items.map(it => (
            <div key={it.id} className="border rounded p-3">
              <h4 className="font-semibold">{it.name}</h4>
              <p className="text-sm text-gray-500">{it.description}</p>
              <p className="mt-1 font-bold">₹{it.price}</p>
              <button
                onClick={() => addToCart(it)}
                className="mt-2 w-full bg-black text-white py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CART */}
      <aside className="bg-white border rounded p-4">
        <h3 className="font-bold mb-3">Cart</h3>

        {cart.length === 0 && (
          <p className="text-sm text-gray-500">No items</p>
        )}

        {cart.map(p => (
          <div key={p.id} className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">₹{p.price} x {p.qty}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(p.id, p.qty - 1)}
                className="px-2 border rounded"
              >-</button>
              <span>{p.qty}</span>
              <button
                onClick={() => updateQty(p.id, p.qty + 1)}
                className="px-2 border rounded"
              >+</button>
            </div>
          </div>
        ))}

        <div className="border-t mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={checkout}
          disabled={!cart.length}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          Checkout
        </button>
      </aside>
    </div>
  );
}
