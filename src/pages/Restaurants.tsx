import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { Oval } from "react-loader-spinner";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import { Pagination } from "antd";

const Restaurants = () => {
  const authCtx = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const minRating = searchParams.get("minRating");
  const maxRating = searchParams.get("maxRating");

  const url = new URL(`${BASE_URL}/restaurant`);
  url.searchParams.set("page", page);

  if (minRating && maxRating) {
    url.searchParams.set("minRating", minRating);
    url.searchParams.set("maxRating", maxRating);
  }

  const { data, error, isLoading } = useQuery("restaurants", {
    queryFn() {
      return axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${authCtx.user!.token}`,
        },
      });
    },
    retry: 2,
  });

  console.log(data, error, isLoading);

  if (isLoading) {
    return (
      <div className="flex gap-4 justify-center items-center mt-16">
        <Oval width={30} height={30} color="blue" secondaryColor="blue" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <RestaurantList />
      <Pagination
        defaultCurrent={+page}
        pageSize={6}
        total={data?.data.totalCount}
      />
    </div>
  );
};

export default Restaurants;
