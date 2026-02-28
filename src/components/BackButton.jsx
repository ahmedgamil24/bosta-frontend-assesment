import { useNavigate } from 'react-router'

const BackButton = () => {
    const navigate = useNavigate()
  return (
    <>
    {/* Back Button */}
      <div className=" flex justify-center items-center mt-4">
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline btn-primary btn-sm mb-6"
    >
      ← Back to Products
    </button>
</div>
</>
  )
}
export default BackButton