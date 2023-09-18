import { useRouteError } from "react-router-dom";

const Fallback = () => {
  const error: any = useRouteError();
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center h-full font-semibold gap-2">
      <h1 className="text-xl">{error?.response?.status} Error!</h1>
      {error?.message && <h2>{error.message}</h2>}
      <h2>{error?.response?.data?.message || "Something went wrong"}</h2>
    </div>
  );
};

export default Fallback;
