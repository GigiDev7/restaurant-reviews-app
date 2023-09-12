import { IRestaurant } from "../types/types";

type RestaurantCardProps = {
  restaurant: IRestaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return <div>RestaurantCard</div>;
};

export default RestaurantCard;
