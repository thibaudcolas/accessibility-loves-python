import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark-turquoise border-b-8 border-snake-green text-white print:text-dark-blue shadow-md xl:shadow-xl p-4 pb-2">
      <p className="w-full max-w-none">
        <strong>Improving web accessibility with Python</strong> – PyCon US 2021
        poster by <a href="https://github.com/thibaudcolas">Thibaud Colas</a>.
        Code MIT-licensed on GitHub (
        <a href="https://github.com/thibaudcolas/python-accessibility-ftw">
          thibaudcolas/python-accessibility-ftw
        </a>
        ). Site contents available as{" "}
        <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>.
        Live site hosted on <a href="https://vercel.com/">Vercel</a>. Shortlink:{" "}
        <a href="https://thib.me/python-ftw">thib.me/python-ftw</a>.
      </p>
    </footer>
  );
};

export default Footer;
