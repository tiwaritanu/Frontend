import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onAction }) => {
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const isOutOfStock = product.stock <= 0;

  const handleAdd = () => {
    const result = addToCart(product);
    onAction(result.message, result.success ? 'success' : 'error');
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-semibold">{product.title}</h3>
        <p className="mt-2 text-xl font-bold text-indigo-600">${product.price}</p>
        <p className={`mt-2 text-sm ${isOutOfStock ? 'text-rose-600' : 'text-emerald-600'}`}>
          {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
        </p>

        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
