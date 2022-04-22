import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { useLocaleMetadata } from "../../lib/hooks/useLocale";
import { logo } from "../../lib/misc/logo";
import { Arrow } from "../LocalesDropdown/LocalesDropdown.icons";
import { MetadaSkeleton } from "../Skeletons/Skeletons";
import TextView from "../TextView/TextView";

const LocaleMetadata: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const meta = useLocaleMetadata(router.query.l as string, isOpen);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer m-0 flex items-center justify-center"
      >
        Display locale metadata
        {isOpen ? (
          <Arrow className="mx-2 h-3 w-3 rotate-180" />
        ) : (
          <Arrow className="mx-2 h-3 w-3" />
        )}
      </button>

      {isOpen && meta?.hasErrors ? (
        <span className="text-sm text-red-600/50">
          Locale metadata not found.
        </span>
      ) : null}

      {isOpen && !meta?.hasErrors ? (
        meta ? (
          <div className="mt-2 flex">
            <div>
              <div className="flex">
                <div className="flex-none">
                  <img
                    className="h-48 w-48 object-cover"
                    src={meta?.result[0]?.metaImage || logo}
                    alt={meta?.result[0]?.metaTitle}
                    title={meta?.result[0]?.metaTitle}
                    onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
                      (e.currentTarget.src = logo)
                    }
                  />
                </div>
                <div className="ml-4 flex flex-col justify-between">
                  <div className="flex">
                    <img
                      className="h-7 w-7 object-cover"
                      src={meta?.result[0]?.favicon || logo}
                      alt={meta?.result[0]?.metaTitle}
                      title={meta?.result[0]?.metaTitle}
                      onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
                        (e.currentTarget.src = logo)
                      }
                    />
                    <span className="ml-2">{meta?.result[0]?.metaTitle}</span>
                  </div>
                  <span className="mr-4">
                    {meta?.result[0]?.metaDescription}
                  </span>
                  <div className="mt-2 flex justify-between text-sm text-slate-500">
                    <span>
                      Created:{" "}
                      {meta &&
                        new Date(meta?.result[0]?.createdAt).toDateString()}
                    </span>
                    <span className="mr-4">
                      Updated:{" "}
                      {meta &&
                        new Date(meta?.result[0]?.updatedAt).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span>PGdataLayer.GTM: </span>
              <div className="overflow-hidden">
                <div className="h-40 overflow-auto">
                  <TextView data={meta?.result[0]?.GTM} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MetadaSkeleton />
        )
      ) : null}
    </div>
  );
};

export default LocaleMetadata;
