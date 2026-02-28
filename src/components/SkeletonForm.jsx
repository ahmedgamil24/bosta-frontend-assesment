const SkeletonForm = () => {
  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-base-300 rounded w-1/3"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-base-300 rounded w-1/4"></div>
            <div className="h-10 bg-base-300 rounded w-full"></div>
          </div>
        ))}
        <div className="h-10 bg-base-300 rounded w-full mt-4"></div>
      </div>
    </div>
  )
}
export default SkeletonForm