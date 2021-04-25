import Link from "next/link";

interface HeadingProps {
  level?: "h2" | "h3";
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A heading element with added anchor link, built according to:
 * https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
 */
const Heading = ({
  level = "h3",
  id,
  children,
  className = "",
}: HeadingProps) => {
  let heading;

  if (level === "h2") {
    heading = (
      <h2 id={id} className={`${className} inline-block me-2`}>
        {children}
      </h2>
    );
  } else {
    heading = (
      <h3 id={id} className="inline-block me-2">
        {children}
      </h3>
    );
  }
  return (
    <>
      {heading}
      <Link href={`#${id}`}>
        <a className="inline-block no-underline opacity-50 hover:opacity-100 hover:underline focus:opacity-100 focus:underline">
          <span aria-hidden="true">#</span>
          <span className="sr-only">Link to “{children}”</span>
        </a>
      </Link>
    </>
  );
};

export default Heading;
