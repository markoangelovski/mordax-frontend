import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

interface Keys {
  oldKey: string;
  setKey?: Function;
}

const useKey = () => {
  const [oldKey, setOldKey] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const key = window.localStorage.getItem("mordax_key");

    if (!key) router.push("/login");

    setOldKey(key);
  }, []);

  const setKey = (key: string) => {
    window.localStorage.setItem("mordax_key", key);
  };

  return { oldKey, setKey };
};

export default useKey;
