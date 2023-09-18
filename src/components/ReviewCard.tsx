import { useState } from "react";
import { IReview } from "../types/types";
import UserImg from "../assets/user.png";
import { StarFilled, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";

type ReviewCardProps = {
  review: IReview;
  isRated?: boolean;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isRated = false }) => {
  const auth = useAuth();
  const client = useQueryClient();
  const { restaurantId } = useParams();

  const [isDeleteOptionShown, setIsDeleteOptionShown] = useState(false);

  const toggleOption = () => setIsDeleteOptionShown((prev) => !prev);

  const deleteReviewMutation = useMutation(
    () => {
      return axios.delete(`${BASE_URL}/review/${review._id}`, {
        headers: { Authorization: `Bearer ${auth.user?.token}` },
      });
    },
    {
      onSuccess() {
        client.invalidateQueries(["restaurant", restaurantId]);
        setIsDeleteOptionShown(false);
      },
    }
  );

  const handleDeleteClick = () => {
    deleteReviewMutation.mutate();
  };

  return (
    <div className="flex gap-12">
      <div className="flex flex-col items-center gap-2 w-1/5">
        <div className="flex gap-3 relative">
          <img className="w-12 h-12 rounded-[50%]" src={UserImg} alt="user" />
          {auth.user?._id === review.user._id && !isRated && (
            <EditOutlined
              onClick={toggleOption}
              className="absolute -right-5 cursor-pointer"
            />
          )}
          {isDeleteOptionShown && (
            <div className="bg-white py-2 px-4 shadow-lg z-20 absolute -top-12 -right-10">
              <button onClick={handleDeleteClick}>
                {deleteReviewMutation.isLoading ? "Deleting.." : "Delete"}
              </button>
            </div>
          )}
        </div>
        <span className="text-xs text-center">
          {review.user.firstname} {review.user.lastname}
        </span>
      </div>
      <div className="flex flex-col gap-4 ">
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
            {moment(review.date).format("MMMM")}{" "}
            {moment(review.date).format("YYYY")}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default ReviewCard;
