import { useRouter } from "next/router";

const Lawfirm = () => {
  const router = useRouter();
  return (
    <div>
      <h1>lawfirm {router.pathname}</h1>
    </div>
  );
};

export default Lawfirm;
