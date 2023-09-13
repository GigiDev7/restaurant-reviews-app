import { IRestaurant, IReview } from "../types/types";
import { StarFilled } from "@ant-design/icons";
import { FaLocationDot } from "react-icons/fa6";
import ReviewCard from "./ReviewCard";

type RestaurantInfoProps = {
  restaurant: IRestaurant;
  reviewMax: IReview | null;
  reviewMin: IReview | null;
};

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  restaurant,
  reviewMax,
  reviewMin,
}) => {
  console.log(reviewMax);

  return (
    <div className="flex gap-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
        <h3 className="flex items-center gap-1 font-medium">
          {restaurant.averageRating ?? 0}{" "}
          <StarFilled className="text-yellow-400" />{" "}
          <span className="text-sm font-medium">
            {restaurant.reviews.length} reviews
          </span>
        </h3>
        <h3 className="flex items-center">
          <FaLocationDot />{" "}
          <span className="text-gray-800 font-medium text-sm">
            {restaurant.address}
          </span>
        </h3>
        <img
          className="w-[28rem]"
          src={restaurant.imageUrl}
          alt="restaurant-image"
        />
      </div>
      <div className="flex gap-20 mt-16">
        {reviewMax && <ReviewCard review={reviewMax} />}
        {reviewMin && reviewMin.rating !== reviewMax?.rating && (
          <ReviewCard review={reviewMin} />
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;
