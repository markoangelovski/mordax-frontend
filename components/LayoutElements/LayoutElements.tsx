interface Props {
  className?: string;
  children: React.ReactNode;
}

export const InputsRow = ({ className, children }: Props) => {
  return <div className={`mt-2 flex ${className || ""}`}>{children}</div>;
};
