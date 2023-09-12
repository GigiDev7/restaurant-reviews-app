import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <InfinitySpin width="200" color="blue" />
    </div>
  );
};

export default Loading;
