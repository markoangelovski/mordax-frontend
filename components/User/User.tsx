import { useRouter } from "next/router";

import useUser from "../../lib/hooks/useUser";

const User: React.FC = () => {
  const router = useRouter();

  const user = useUser();

  if (router.pathname !== "/login") return <div>{user?.issuedFor}</div>;

  return null;
};

export default User;
