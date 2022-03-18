import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

import useLocales from "../../lib/hooks/useLocales";

const LocalesDropdown: React.FC = () => {
  const locales = useLocales();
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const existingLocale = queryParams.get("l");

    if (existingLocale && existingLocale !== "undefined") {
      router.push(`?l=${existingLocale}`, undefined, {
        shallow: true,
      });
    } else {
      // @ts-ignore
      locales &&
        router.push(`?l=${locales?.result[0].url.value}`, undefined, {
          shallow: true,
        });
    }
  }, [locales]);

  return (
    <>
      {locales?.result.map((locale, i) => (
        <div key={i}>
          <button
            onClick={() =>
              // @ts-ignore
              router.push(`?l=${locale.url.value}`, undefined, {
                shallow: true,
              })
            }
          >
            {
              // @ts-ignore
              locale.brand.value
            }
          </button>{" "}
          {
            // @ts-ignore
            locale.locale.value
          }
        </div>
      ))}
    </>
  );
};

export default LocalesDropdown;
