'use client';

export default function Receipt({ order }) {
  if (!order || !order.items || order.items.length === 0) {
    return <p className="text-gray-500">No receipt available</p>;
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.05; // 5% GST placeholder
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm font-mono">
      {/* Restaurant Header */}
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-lg font-bold">🍴 My Restaurant</h1>
        <p className="text-xs text-gray-500">
          Order #{order.id || 'N/A'} • {new Date().toLocaleString()}
        </p>
      </div>

      {/* Items */}
      <ul className="divide-y text-sm mb-4">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between py-1">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="border-t pt-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%):</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base mt-2">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Thank you for dining with us! 🙏
      </p>
    </div>
  );
}
