import { useEffect, useMemo, useState } from 'react';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';
import { fetchProducts } from '../services/api';

const ITEMS_PER_PAGE = 10;

const ProductPage = ({ onAction }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedQuery = useDebounce(query, 300);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected API error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [products, debouncedQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadProducts} />;
  }

  return (
    <section>
      <div className="mb-6">
        <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-700">
          Search products
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none ring-indigo-300 focus:ring md:max-w-md"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
          <p className="font-medium text-slate-600">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAction={onAction} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page < 1 || page > totalPages) {
                return;
              }
              setCurrentPage(page);
            }}
          />
        </>
      )}
    </section>
  );
};

export default ProductPage;
