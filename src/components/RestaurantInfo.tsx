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
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-32">
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
      <div className="flex gap-20 mt-24">
        {reviewMax && (
          <div className="flex flex-col gap-4">
            <h2 className="font-medium">Highest rated review</h2>
            <ReviewCard review={reviewMax} />
          </div>
        )}
        {reviewMin && reviewMin.rating !== reviewMax?.rating && (
          <div className="flex flex-col gap-4">
            <h2 className="font-medium">Lowest rated review</h2>
            <ReviewCard review={reviewMin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;
