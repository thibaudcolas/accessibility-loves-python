import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header
      className={`grid grid-cols-2 bg-dark-turquoise border-b-8 border-snake-green text-white shadow-md p-4 pb-2`}
    >
      <h1>
        Improving web accessibility with Python
        <br className="2xl:hidden" />
        <span className="inline-block relative top-1 pe-2">
          <Image src="/illustrations/snake.svg" alt="" width={32} height={32} />
        </span>
        <small className="text-pale-blue font-serif">PyCon US 2021</small>
      </h1>
      <div className="grid grid-flow-col-dense">
        <nav className="grid lg:grid-flow-col gap-2 items-baseline">
          <Link href="/#curlylint">
            <a className="text-pale-blue">Curlylint</a>
          </Link>
          <Link href="/#kontrasto">
            <a className="text-pale-blue">Kontrasto</a>
          </Link>
          <Link href="/#why">
            <a className="text-pale-blue">Why this matters</a>
          </Link>
          <span>
            By{" "}
            <a
              href="https://github.com/thibaudcolas"
              className="text-pale-blue"
            >
              Thibaud Colas
            </a>
            <span className="inline-block align-middle">
              <Image
                src="/illustrations/vector-tails.svg"
                alt=""
                width={64}
                height={64}
              />
            </span>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
