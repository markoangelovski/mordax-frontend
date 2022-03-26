import Link from "next/link";

interface Breadcrumb {
  label: string;
  endpoint?: string;
}

interface Props {
  breadcrumb: Breadcrumb;
}

const Breadcrumb = ({ breadcrumb }: Props) => {
  if (breadcrumb.endpoint) {
    return (
      <>
        <div>
          <Link href={breadcrumb.endpoint}>
            <a className="text-slate-500 underline">
              <span>{breadcrumb.label}</span>
            </a>
          </Link>
        </div>
        <div className="px-1 text-slate-500">/</div>
      </>
    );
  } else {
    return <div className="text-slate-500">{breadcrumb.label}</div>;
  }
};

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <div className="flex text-sm">
      {breadcrumbs.map((breadcrumb, i) => (
        <Breadcrumb key={i} breadcrumb={breadcrumb} />
      ))}
    </div>
  );
};

export default Breadcrumbs;
