import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={className}
      style={{ padding: "0 calc((100% - 1440px) / 2)" }}
    >
      {children}
    </div>
  );
};

export const ContentContainer: React.FC = ({ children }) => {
  return <div className="mx-6 mb-40 mt-6">{children}</div>;
};
