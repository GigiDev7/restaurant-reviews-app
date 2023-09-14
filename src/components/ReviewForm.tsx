import { ChangeEvent, useState } from "react";
import { Rate, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

type ReviewData = {
  rating: number | null;
  comment: string | null;
  date: string | null;
};

type ReviewFormProps = {
  closeModal: () => void;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ closeModal }) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: null,
    comment: null,
    date: null,
  });
  const [isValid, setIsValid] = useState(true);

  const authCtx = useAuth();
  const client = useQueryClient();

  const addReviewMutation = useMutation(
    (data: ReviewData) => {
      return axios.post(
        `${BASE_URL}/review`,
        { ...data, restaurantId },
        {
          headers: {
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );
    },
    {
      onSuccess() {
        client.invalidateQueries(["restaurant", restaurantId]);
        setReviewData({ comment: null, date: null, rating: null });
        closeModal();
      },
    }
  );

  const { restaurantId } = useParams();

  const handleRateChange = (value: number) => {
    setReviewData((prev) => {
      return { ...prev, rating: value };
    });
  };

  const handleDateChange = (_: any, dateStr: string) => {
    setReviewData((prev) => {
      return { ...prev, date: dateStr };
    });
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData((prev) => {
      return { ...prev, comment: e.target.value };
    });
  };

  const handleAddReviewClick = () => {
    setIsValid(true);
    if (!reviewData.comment || !reviewData.date || !reviewData.rating) {
      setIsValid(false);
      return;
    }
    addReviewMutation.mutate(reviewData);
  };

  return (
    <div>
      <h1 className="text-2xl font-medium text-center">
        Tell us how was your visit
      </h1>
      {!isValid && (
        <p className="text-red-500 text-center mt-2">
          Please fill all fields to add review!
        </p>
      )}
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-xl font-medium">
          How would you rate your experience?
        </h2>
        <Rate onChange={handleRateChange} />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-xl font-medium">When did you go?</h2>
        <DatePicker onChange={handleDateChange} />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-xl font-medium">Write your review</h2>
        <textarea
          onChange={handleCommentChange}
          placeholder="Give us the gist of your experience"
          className="border-black border-[2px] rounded-sm p-1"
          rows={16}
        ></textarea>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleAddReviewClick}
          className="text-white hover:opacity-80 mt-6 bg-black px-5 py-2 rounded-sm"
        >
          {addReviewMutation.isLoading ? "Loading..." : "Add review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
