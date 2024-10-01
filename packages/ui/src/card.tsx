export function Card({
  title,
  children,
  classNames,
}: {
  title: string;
  children?: React.ReactNode;
  classNames?: string;
}): JSX.Element {
  return (
    <div
      className={"border p-4 " + classNames}
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div >
  );
}