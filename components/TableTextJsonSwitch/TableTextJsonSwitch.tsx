import { Container } from "../Containers/Containers";

interface Switch {
  showTable?: boolean;
  activeSwitch: string;
  setActiveSwitch: (active: string) => void;
}

const TableTextJsonSwitch = ({
  showTable = false,
  activeSwitch,
  setActiveSwitch
}: Switch) => {
  return (
    <Container className="min-h-full bg-slate-50">
      <div className="-mt-1 inline-flex px-6">
        {showTable ? (
          <span className="pr-8">
            <button
              onClick={() => setActiveSwitch("table")}
              className={`pb-1 ${
                activeSwitch === "table" ? "border-b-2 border-sky-700" : ""
              }`}
            >
              <span>Table</span>
            </button>
          </span>
        ) : null}
        <span className="pr-8">
          <button
            onClick={() => setActiveSwitch("text")}
            className={`pb-1 ${
              activeSwitch === "text" ? "border-b-2 border-sky-700" : ""
            }`}
          >
            <span>Text</span>
          </button>
        </span>
        <span className="pr-8">
          <button
            onClick={() => setActiveSwitch("json")}
            className={`pb-1 ${
              activeSwitch === "json" ? "border-b-2 border-sky-700" : ""
            }`}
          >
            <span>JSON</span>
          </button>
        </span>
      </div>
    </Container>
  );
};

export default TableTextJsonSwitch;
