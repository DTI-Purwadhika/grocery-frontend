import { API_URL } from "@/constants";
const page = () => {
  return (
    <div>
      {API_URL} <br />
      {process.env.NEXT_PUBLIC_API_BASE_URL}
    </div>
  );
};

export default page;
