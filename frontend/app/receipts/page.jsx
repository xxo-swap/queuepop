'use client';
import { useEffect, useState } from 'react';
import Receipt from '../../components/Receipt';

export default function ReceiptsPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const last = localStorage.getItem('lastReceipt');
    if (last) setOrder(JSON.parse(last));
  }, []);

  if (!order) return <div className="p-6">No receipt found.</div>;

  return (
    <div className="max-w-md mx-auto mt-6">
      <Receipt order={order} />
      <div className="mt-4 flex gap-2">
        <button onClick={()=> window.print()} className="bg-blue-600 text-white px-4 py-2 rounded">Print</button>
        <a href="/pos" className="px-4 py-2 border rounded">Back to POS</a>
      </div>
    </div>
  );
}
