import { IReview } from "../types/types";
import UserImg from "../assets/user.png";
import { StarFilled } from "@ant-design/icons";

type ReviewCardProps = {
  review: IReview;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex gap-12">
      <div className="flex flex-col items-center gap-2">
        <img className="w-12 h-12 rounded-[50%]" src={UserImg} alt="user" />
        <span className="text-xs text-center">
          {review.user.firstname} {review.user.lastname}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <h2 className="mr-1 font-medium">{review.rating}</h2>
          {Array.from(Array(review.rating).keys()).map((el) => (
            <StarFilled key={el} className="text-yellow-400" />
          ))}
        </div>
        <h3>{review.comment}</h3>
        <h3 className="font-medium">
          Date of visit:{" "}
          <span className="text-sm font-normal text-gray-800">
            {review.date}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default ReviewCard;
