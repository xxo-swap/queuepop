'use client';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import ItemCard from '../items/page';
import Cart from '../../components/Cart';

export default function POSPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {

    const data = fetch('/api/v1/menu/').then(res => res.json()).then(setItems).catch(console.error);
    console.log(data);

    // Temporary static data
    setItems([
      { id: 1, name: "Pizza", price: 200, description: "Cheesy pizza" },
      { id: 2, name: "Burger", price: 150, description: "Beef burger" },
    ]);
  }, []);

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateQty(id, qty) {
    setCart(prev => prev.map(p => p.id===id ? { ...p, qty } : p).filter(p=>p.qty>0));
  }

  function checkout() {
    // 🔌 replace with backend order creation
    localStorage.setItem('lastReceipt', JSON.stringify({ id: Date.now(), items: cart, total: cart.reduce((s,i)=>s+i.price*i.qty,0), createdAt: new Date() }));
    setCart([]);
    window.open('/receipts', '_self');
  }

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2">
          <h3 className="text-lg font-bold mb-3">Menu</h3>
          <div className="grid grid-cols-2 gap-3">
            {items.map(it => <ItemCard key={it.id} item={it} onAdd={()=>addToCart(it)} />)}
          </div>
        </section>
        <aside className="bg-white p-3 rounded shadow">
          <Cart items={cart} onChangeQty={updateQty} onCheckout={checkout} />
        </aside>
      </div>
    </ProtectedRoute>
  );
}
