import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Arrow, Clear, CheckMark } from "./LocalesDropdown.icons";

import useLocales from "../../lib/hooks/useLocales";
import { Locale } from "../../lib/interfaces/locales";

interface Props {
  locale: Locale;
  selectedLocale: Locale | undefined;
  setIsOpen: Function;
  setSearchedLocale: Function;
}

const LocaleItem = ({
  locale,
  selectedLocale,
  setIsOpen,
  setSearchedLocale,
}: Props) => {
  const router = useRouter();

  return (
    <span
      className="flex h-10 cursor-pointer items-center items-center py-2.5 pl-7 pr-3 last:rounded-b-lg hover:bg-gray-100"
      onClick={() => {
        router.push(`?l=${locale.url.value}`, undefined, {
          shallow: true,
        });
        setIsOpen(false);
        setSearchedLocale("");
      }}
    >
      {selectedLocale?.url.value === locale.url.value && (
        <CheckMark className="absolute left-2 h-3 w-3" />
      )}
      {locale.brand.value} {locale.locale.value}
    </span>
  );
};

const LocalesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchedLocale, setSearchedLocale] = useState<string>("");

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

  const selectedLocale = locales?.find(
    locale => locale.url.value === router.query.l
  );

  return (
    <>
      <div className="">
        <button
          onClick={() => setIsOpen(open => !open)}
          className="pointer m-0 flex h-full w-full items-center justify-center"
          // style={{ left: "-8px", top: "-3px" }}
        >
          {locales && (
            <span>
              {selectedLocale
                ? selectedLocale.brand.value + " " + selectedLocale.locale.value
                : locales[0].brand.value + " " + locales[0].locale.value}
            </span>
          )}
          {isOpen ? (
            <Arrow className="mx-2 h-3 w-3 rotate-180" />
          ) : (
            <Arrow className="mx-2 h-3 w-3" />
          )}
        </button>

        {isOpen ? (
          <div className="relative">
            <div
              className="fixed inset-0 z-50 bg-black opacity-20"
              onClick={() => setIsOpen(false)}
            ></div>
            <aside
              className="absolute right-0 top-2 z-50	min-w-max rounded-lg bg-white pt-1 shadow-xl will-change-transform"
              // style={{
              //   transform: "translate3d(0px, 16px, 0px)",
              //   transition: "opacity 0.3s ease-in-out",
              // }}
            >
              <div className="relative">
                <div className="border-b py-3 px-4">
                  <div className="flex h-10 items-center justify-between rounded border shadow-inner">
                    <input
                      className="pl-3 focus:outline-none"
                      type="text"
                      name="locale"
                      id="locale"
                      maxLength={150}
                      value={searchedLocale}
                      onChange={e => setSearchedLocale(e.target.value)}
                      autoComplete="off"
                    />
                    <button className="mx-2 flex cursor-pointer align-middle">
                      {searchedLocale.length ? (
                        <Clear
                          className="h-4 w-4 rounded-full bg-gray-500 p-1"
                          setSearchedLocale={setSearchedLocale}
                        />
                      ) : null}
                    </button>
                  </div>
                </div>
                <div className="overflow-hidden rounded-b-lg">
                  <div className="relative max-h-72 w-80 overflow-auto">
                    {!searchedLocale.length
                      ? locales?.map((locale, i) => (
                          <LocaleItem
                            key={i}
                            locale={locale}
                            selectedLocale={selectedLocale}
                            setIsOpen={setIsOpen}
                            setSearchedLocale={setSearchedLocale}
                          />
                        ))
                      : locales
                          ?.filter(locale => {
                            let rgx;
                            try {
                              // Handle errors in case someone enter Regex-reserved character, such as +
                              rgx = new RegExp(searchedLocale, "gi");
                            } catch (error: any) {
                              console.warn(error.message);
                            }
                            if (
                              rgx?.test(locale.brand.value) ||
                              rgx?.test(locale.locale.value)
                            )
                              return true;
                          })
                          .map((locale, i) => (
                            <LocaleItem
                              key={i}
                              locale={locale}
                              selectedLocale={selectedLocale}
                              setIsOpen={setIsOpen}
                              setSearchedLocale={setSearchedLocale}
                            />
                          ))}
                  </div>
                </div>
                <div className="absolute -top-2 right-2 h-4 w-4 rotate-45 bg-white"></div>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default LocalesDropdown;
