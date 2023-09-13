import { Radio, RadioChangeEvent } from "antd";
import { useSearchParams } from "react-router-dom";

const RatingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const minRating = searchParams.get("minRating");
  const maxRating = searchParams.get("maxRating");

  const handleFilterChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    const minRating = value[0];
    const maxRating = value[2];
    setSearchParams((params) => {
      params.set("minRating", minRating);
      params.set("maxRating", maxRating);
      return params;
    });
  };

  const handleFilterReset = () => {
    setSearchParams((params) => {
      params.delete("minRating");
      params.delete("maxRating");
      return params;
    });
  };

  return (
    <div className="w-[20%]">
      <h2 className="font-medium mb-2">Filter by Rating</h2>
      <Radio.Group
        onChange={handleFilterChange}
        value={minRating && maxRating ? `${minRating}-${maxRating}` : 0}
        className="flex flex-col gap-2"
      >
        <Radio value="1-2">1 - 2 stars</Radio>
        <Radio value="2-3">2 - 3 stars</Radio>
        <Radio value="3-4">3 - 4 stars</Radio>
        <Radio value="4-5">4 - 5 stars</Radio>
      </Radio.Group>
      <button onClick={handleFilterReset} className="mt-2 hover:opacity-70">
        Reset filters
      </button>
    </div>
  );
};

export default RatingFilter;
