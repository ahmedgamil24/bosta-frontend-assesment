function EmptyState({
  icon = "📦",
  title = "No Data Found",
  description = "There is nothing to display right now.",
  actionText,
  onAction,
}){

  return (
    <div className="flex justify-center items-center mt-20 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg text-center border border-gray-200 p-8">
        <div className="text-5xl mb-4">{icon}</div>

        <h2 className="text-xl font-bold mb-2">{title}</h2>

        <p className="text-gray-500 mb-6">{description}</p>

        {actionText && onAction && (
          <button
            onClick={onAction}
            className="btn btn-outline btn-primary"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;