import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { IReview } from "../types/types";
import { Modal } from "antd";
import ReviewForm from "./ReviewForm";

type ReviewListProps = {
  reviews: IReview[];
};

const ReviewsList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numOfReviews, setNumOfReviews] = useState(5);

  const increaseNumOfReviews = () => [
    setNumOfReviews((prevNum) => (prevNum += 5)),
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="flex gap-12">
        <h2 className="font-semibold text-xl">
          Reviews {`(${reviews.length})`}
        </h2>
        <button
          onClick={showModal}
          className="bg-black text-white font-semibold px-5 py-2 rounded-sm hover:opacity-80"
        >
          Write a review
        </button>
      </div>
      <div
        id="review-list"
        className=" flex flex-col gap-8 max-h-[50rem] w-1/2 overflow-auto"
      >
        {reviews.slice(0, numOfReviews).map((review) => (
          <ReviewCard review={review} key={review._id} />
        ))}
        {reviews.length > numOfReviews && (
          <button
            onClick={increaseNumOfReviews}
            className="w-fit text-blue-600 text-sm"
          >
            Load more reviews
          </button>
        )}
      </div>

      <Modal
        destroyOnClose={true}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <ReviewForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ReviewsList;
