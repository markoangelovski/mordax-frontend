import { toStdCase } from "../../lib/helpers/utils";
import { Stats } from "../../lib/interfaces/locales";

interface Props {
  stats: Stats;
}

const LocaleStats = ({ stats }: Props) => {
  const keys = Object.keys(stats);

  return (
    <div>
      {keys.map(key => (
        <span key={key} className="mr-8">
          {toStdCase(key)}:{" "}
          {key === "pagesNotInSitemap" ? (
            <span
              className={`${
                stats[key] === 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stats[key]}
            </span>
          ) : (
            stats[key]
          )}
        </span>
      ))}
    </div>
  );
};

export default LocaleStats;
