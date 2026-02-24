import { useCart } from '../context/CartContext';

const CartItem = ({ item, onAction }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    const result = increaseQuantity(item.id);
    if (!result.success) {
      onAction(result.message, 'error');
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
      <img src={item.thumbnail} alt={item.title} className="h-14 w-14 rounded-md object-cover" loading="lazy" />

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{item.title}</p>
        <p className="text-sm text-slate-500">${item.price} each</p>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            className="rounded border border-slate-300 px-2 py-1"
            onClick={() => decreaseQuantity(item.id)}
          >
            -
          </button>
          <span className="min-w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            type="button"
            className="rounded border border-slate-300 px-2 py-1"
            onClick={handleIncrease}
          >
            +
          </button>
          <button
            type="button"
            className="ml-auto text-sm font-medium text-rose-600 hover:text-rose-700"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
