import { Container } from "../Containers/Containers";

interface Switch {
  activeSwitch: string;
  setActiveSwitch: (active: string) => void;
}

const TextJsonSwitch = ({ activeSwitch, setActiveSwitch }: Switch) => {
  return (
    <Container className="min-h-full bg-slate-50">
      <div className="-mt-1 inline-flex px-6">
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

export default TextJsonSwitch;
