import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header
      className={`grid grid-cols-2 bg-dark-turquoise border-b-8 border-snake-green text-white print:text-dark-blue shadow-md xl:shadow-xl p-4 pb-2 print:pt-0 print:pb-2`}
    >
      <h1>
        Improving web accessibility with Python
        <br className="2xl:hidden" />
        <span className="inline-block relative top-1 pe-2 ms-4 me-2">
          <Image src="/illustrations/snake.svg" alt="" width={48} height={48} />
        </span>
        <small className="text-pale-blue print:text-dark-turquoise font-serif">
          PyCon US 2021
        </small>
      </h1>
      <div className="grid grid-flow-col-dense text-pale-blue print:text-dark-turquoise">
        <nav className="flex gap-4 2xl:gap-8 items-baseline">
          <Link href="/#curlylint">
            <a className="print:hidden">Curlylint</a>
          </Link>
          <Link href="/#kontrasto">
            <a className="print:hidden">Kontrasto</a>
          </Link>
          <Link href="/#why">
            <a className="print:hidden">Why this matters</a>
          </Link>
          <span className="print:hidden">|</span>
          <span className="print:text-2xl print:font-bold">
            <span className="text-white print:text-gray-mid-dark">Link: </span>
            <a href="https://thib.me/python-ftw">thib.me/python-ftw</a>
          </span>
          <span>
            <span className="text-white print:text-gray-mid-dark">By </span>
            <a href="https://github.com/thibaudcolas">Thibaud Colas</a>
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
