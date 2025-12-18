'use client';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function ItemsPage() {
  const [items, setItems] = useState([]);

  // 🔌 placeholder: fetch items from backend
  useEffect(() => {
    setItems([{ id:1, name:"Pizza", price:200 }, { id:2, name:"Burger", price:150 }]);
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h2 className="text-xl font-bold mb-4">Manage Items</h2>
        <div className="space-y-2">
          {items.map(it=>(
            <div key={it.id} className="flex justify-between bg-white p-3 rounded shadow">
              <div>{it.name} - ₹{it.price}</div>
              <div className="flex gap-2">
                <button className="px-2 py-1 border rounded">Edit</button>
                <button className="px-2 py-1 border rounded bg-red-500 text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-green-500 text-white px-3 py-2 rounded">+ Add Item</button>
      </div>
    </ProtectedRoute>
  );
}
