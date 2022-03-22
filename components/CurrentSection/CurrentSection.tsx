import { Container } from "../Containers/Containers";

const CurrentSection = ({ label }: { label: string }) => {
  return (
    <Container className="border-t border-slate-200 bg-slate-50">
      <div className="px-6 pb-4 pt-5">
        <h2 className="text-4xl font-light">
          <span>{label}</span>
        </h2>
      </div>
    </Container>
  );
};

export default CurrentSection;
