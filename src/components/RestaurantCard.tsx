import { IRestaurant } from "../types/types";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

type RestaurantCardProps = {
  restaurant: IRestaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/${restaurant._id}`}>
      <div className="flex flex-col gap-2 hover:opacity-80">
        <img
          className="h-40 w-60 rounded-md"
          src={restaurant.imageUrl}
          alt="restaurants-image"
        />
        <div>
          <h2 className="font-medium">{restaurant.name}</h2>
          <h3>
            {restaurant.averageRating || 0}{" "}
            <StarFilled className="text-yellow-400" />{" "}
            <span className="text-sm text-gray-600">
              {restaurant.reviews.length} reviews
            </span>
          </h3>
          <h3 className="text-sm text-gray-600">{restaurant.address}</h3>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
