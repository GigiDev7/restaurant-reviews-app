import React from "react";
import { IRestaurant } from "../types/types";
import RestaurantCard from "./RestaurantCard";

type RestaurantListProps = {
  restaurants: IRestaurant[];
};

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <div className="flex flex-wrap gap-14">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
