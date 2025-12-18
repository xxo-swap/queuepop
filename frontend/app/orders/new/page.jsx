"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewOrder() {
  const api = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
  const [menu, setMenu] = useState([]);
  const [tableNo, setTableNo] = useState(1);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${api}/menu`).then(r=>r.json()).then(setMenu);
  }, []);

  function add(item) {
    const existing = cart.find(c => c.menuItemId === item.id);
    if (existing) setCart(cart.map(c => c.menuItemId===item.id ? {...c, qty: c.qty+1} : c));
    else setCart([...cart, { menuItemId: item.id, qty: 1 }]);
  }

  async function submit() {
    const res = await fetch(`${api}/orders`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ tableNo: Number(tableNo), items: cart })
    });
    const order = await res.json();
    router.push(`/orders/${order.id}`);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Create Order</h1>
      <label>Table No: <input value={tableNo} onChange={e=>setTableNo(e.target.value)} /></label>
      <h2>Menu</h2>
      <ul>{menu?.map(m=> <li key={m.id}>{m.name} — ₹{m.price} <button onClick={()=>add(m)}>Add</button></li>)}</ul>
      <h2>Cart</h2>
      <ul>{cart.map(c=><li key={c.menuItemId}>{menu.find(m=>m.id===c.menuItemId)?.name} x {c.qty}</li>)}</ul>
      <button onClick={submit}>Place Order</button>
    </main>
  );
}
