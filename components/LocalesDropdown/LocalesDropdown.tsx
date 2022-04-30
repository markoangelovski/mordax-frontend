import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Arrow, Clear, CheckMark } from "./LocalesDropdown.icons";

import useLocales, { useAllLocales } from "../../lib/hooks/useLocales";
import { DropdownLocale, Locale } from "../../lib/interfaces/locales";

interface Props {
  locale: DropdownLocale;
  selectedLocale: DropdownLocale | undefined;
  setIsOpen: Function;
  setSearchedLocale: Function;
}

const LocaleItem = ({
  locale,
  selectedLocale,
  setIsOpen,
  setSearchedLocale
}: Props) => {
  const router = useRouter();

  return (
    <span
      className="flex h-10 cursor-pointer items-center items-center py-2.5 pl-7 pr-3 hover:bg-gray-100"
      onClick={() => {
        router.push(`?l=${locale.url}`, undefined, {
          shallow: true
        });
        setIsOpen(false);
        setSearchedLocale("");
      }}
    >
      {selectedLocale?.url === locale.url && (
        <CheckMark className="absolute left-2 h-3 w-3" />
      )}
      {locale.brand}
    </span>
  );
};

const LocalesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchedLocale, setSearchedLocale] = useState<string>("");

  const locales = useAllLocales();
  const router = useRouter();

  useEffect(() => {
    const existingLocale = new URLSearchParams(window.location.search).get("l");
    // const existingLocale = queryParams.get("l");

    if (!existingLocale) {
      locales &&
        router.push(`?l=${locales.result[0].url}`, undefined, {
          shallow: true
        });
    }
  }, [locales]);

  const selectedLocale = locales?.result.find(
    locale => locale.url === router.query.l
  );

  return (
    <>
      <div className="">
        <button
          onClick={() => setIsOpen(open => !open)}
          className="pointer m-0 flex h-full w-full items-center justify-center"
        >
          {locales && (
            <span>
              {selectedLocale ? selectedLocale.brand : locales.result[0].brand}
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
            <aside className="absolute right-0 top-2 z-50	min-w-max rounded-lg bg-white pt-1 shadow-xl">
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
                      autoFocus
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
                      ? locales?.result.map((locale, i) => (
                          <LocaleItem
                            key={i}
                            locale={locale}
                            selectedLocale={selectedLocale}
                            setIsOpen={setIsOpen}
                            setSearchedLocale={setSearchedLocale}
                          />
                        ))
                      : locales?.result
                          ?.filter(locale => {
                            let rgx;
                            try {
                              // Handle errors in case someone enter Regex-reserved character, such as +
                              rgx = new RegExp(searchedLocale, "gi");
                            } catch (error: any) {
                              console.warn(error.message);
                            }
                            if (rgx?.test(locale.brand)) return true;
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
