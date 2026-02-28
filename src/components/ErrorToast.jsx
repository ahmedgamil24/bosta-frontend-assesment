const ErrorToast = ( {error, setError} ) => {
  return (
    <div className="toast toast-end">
    <div className="alert alert-error shadow-lg">
      <span>{error}</span>
      <button className="btn btn-sm btn-circle ml-4" onClick={() => setError(null)}>
        ✕
      </button>
    </div>
  </div>
  )
}
export default ErrorToast