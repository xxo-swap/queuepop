"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();
  const { id } = useParams();
  const api = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
  const [order, setOrder] = useState(null);
  const [kot, setKot] = useState(null);
  const [pin, setPin] = useState("");
  const [managerId, setManagerId] = useState("");
  const [reason, setReason] = useState("");

  useEffect(()=> {
    fetch(`${api}/orders/${id}`).then(r=>r.json()).then(setOrder);
    // we'll also fetch KOT by scanning by order id via prisma route? For demo, the backend doesn't have kot by order GET; so we will call /kot?orderId support not added — instead after creating KOT store response.
  }, [id]);

  async function createKot() {
    const res = await fetch(`${api}/kot`, {
      method: "POST",
      headers: { "Content-Type":"application/json", Authorization: `Bearer ${localStorage.getItem("token")||""}` },
      body: JSON.stringify({ orderId: id, lock: true })
    });
    const data = await res.json();
    setKot(data);
  }

  async function reprintSelf() {
    const res = await fetch(`${api}/kot/${kot.id}/reprint`, {
      method: "POST",
      headers: { "Content-Type":"application/json", Authorization: `Bearer ${localStorage.getItem("token")||""}` },
      body: JSON.stringify({ authType: "self", credential: pin, reason })
    });
    const j = await res.json();
    alert(JSON.stringify(j));
  }

  async function reprintManager() {
    const res = await fetch(`${api}/kot/${kot.id}/reprint`, {
      method: "POST",
      headers: { "Content-Type":"application/json", Authorization: `Bearer ${localStorage.getItem("token")||""}` },
      body: JSON.stringify({ authType: "manager", managerId, credential: pin, reason })
    });
    const j = await res.json();
    alert(JSON.stringify(j));
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Order</h1>
      {order ? <>
        <div>Order ID: {order.id}</div>
        <div>Table: {order.tableId || "walk-in"}</div>
        <div>Status: {order.status}</div>
        <h3>Items</h3>
        <ul>{order.items.map(i=> <li key={i.id}>{i.name} x {i.qty} — ₹{i.price}</li>)}</ul>
        <div>Total: ₹{order.total}</div>
        <button onClick={createKot}>Send KOT to Kitchen (lock)</button>
      </> : <div>Loading order...</div>}

      {kot && <>
        <h2>KOT</h2>
        <div>KOT ID: {kot.id}</div>
        <div>Printed: {kot.printedCount}</div>
        <div>Locked: {String(kot.locked)}</div>
        <h3>Reprint (self)</h3>
        <input placeholder="Your PIN" value={pin} onChange={(e)=>setPin(e.target.value)} />
        <input placeholder="Reason" value={reason} onChange={(e)=>setReason(e.target.value)} />
        <button onClick={reprintSelf}>Reprint (self PIN)</button>
        <h3>Reprint (manager)</h3>
        <input placeholder="Manager Id" value={managerId} onChange={(e)=>setManagerId(e.target.value)} />
        <input placeholder="Manager PIN" value={pin} onChange={(e)=>setPin(e.target.value)} />
        <button onClick={reprintManager}>Reprint (manager)</button>
      </>}
    </main>
  )
}
