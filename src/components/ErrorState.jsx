const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center shadow-soft">
      <p className="mb-4 text-rose-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-rose-600 px-4 py-2 font-medium text-white hover:bg-rose-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
