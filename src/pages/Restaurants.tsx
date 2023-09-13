import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { Oval } from "react-loader-spinner";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import { Pagination } from "antd";
import { IRestaurant } from "../types/types";

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

  const onPageChange = (page: number) => {
    setSearchParams((params) => {
      params.set("page", page.toString());
      return params;
    });
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["restaurants", page],
    queryFn() {
      return axios.get<{
        totalCount: number;
        restaurants: IRestaurant[];
      }>(url.toString(), {
        headers: {
          Authorization: `Bearer ${authCtx.user!.token}`,
        },
      });
    },
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="flex gap-4 justify-center items-center mt-16">
        <Oval width={30} height={30} color="blue" secondaryColor="blue" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between pb-8 px-12">
      {data && (
        <>
          <Header />
          <RestaurantList restaurants={data.data.restaurants} />
          <Pagination
            onChange={onPageChange}
            className="mx-auto"
            defaultCurrent={+page}
            pageSize={6}
            total={data?.data.totalCount}
          />
        </>
      )}
    </div>
  );
};

export default Restaurants;
