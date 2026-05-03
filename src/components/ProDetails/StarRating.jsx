import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function StarRating({ rating, isTextRate }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= Math.floor(rating) ? (
            <AiFillStar className="text-amber-400" size={16} />
          ) : star - 0.5 === rating ? (
            <AiFillStar className="text-amber-300" size={16} />
          ) : (
            <AiOutlineStar className="text-gray-300" size={16} />
          )}
        </span>
      ))}
      {isTextRate && (
        <span className="text-sm text-gray-500 ml-1">{rating} / 5.0</span>
      )}
    </div>
  );
}
export default StarRating;
