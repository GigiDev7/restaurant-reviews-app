import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { Oval } from "react-loader-spinner";
import RestaurantInfo from "../components/RestaurantInfo";
import { IRestaurant, IReview } from "../types/types";
import ReviewsList from "./ReviewsList";

type RestaurantData = {
  restaurant: IRestaurant;
  reviewMin: IReview | null;
  reviewMax: IReview | null;
};

const RestaurantDetails = () => {
  const authCtx = useAuth();
  const { restaurantId } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn() {
      return axios.get<RestaurantData>(
        `${BASE_URL}/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.user!.token}`,
          },
        }
      );
    },
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex gap-4 justify-center items-center mt-16">
        <Oval width={30} height={30} color="blue" secondaryColor="blue" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="px-16 mt-12">
      {data && (
        <>
          <RestaurantInfo
            restaurant={data.data.restaurant}
            reviewMax={data.data.reviewMax}
            reviewMin={data.data.reviewMin}
          />
          <ReviewsList />
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
