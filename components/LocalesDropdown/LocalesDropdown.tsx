import { useRouter } from "next/router";
import { useEffect } from "react";

import useLocales from "../../lib/hooks/useLocales";

const LocalesDropdown: React.FC = () => {
  const locales = useLocales();
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const existingLocale = queryParams.get("l");

    if (!existingLocale) {
      locales &&
        router.push(`?l=${locales[0].url.value}`, undefined, {
          shallow: true,
        });
    }
  }, [locales]);

  return (
    <>
      {locales?.map((locale, i) => (
        <div key={i}>
          <button
            onClick={() =>
              router.push(`?l=${locale.url.value}`, undefined, {
                shallow: true,
              })
            }
          >
            {locale.brand.value}
          </button>{" "}
          {locale.locale.value}
        </div>
      ))}
    </>
  );
};

export default LocalesDropdown;
