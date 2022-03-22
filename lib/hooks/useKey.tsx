import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

interface Keys {
  oldKey: string | null;
  setKey: Function;
  removeKey: Function;
}

const useKey = (): Keys => {
  const [oldKey, setOldKey] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const key = window.localStorage.getItem("mordax_key");

    if (!key)
      router.push("/login", undefined, {
        shallow: true
      });

    setOldKey(key);
  }, []);

  const setKey = (key: string) => {
    window.localStorage.setItem("mordax_key", key);
  };

  const removeKey = () => {
    window.localStorage.removeItem("mordax_key");
  };

  return { oldKey, setKey, removeKey };
};

export default useKey;
