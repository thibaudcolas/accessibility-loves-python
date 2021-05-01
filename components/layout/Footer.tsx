import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark-turquoise border-b-8 border-snake-green text-white print:text-dark-blue shadow-md xl:shadow-xl p-4 pb-2 print:pt-0">
      <p className="w-full max-w-none">
        <strong>Improving web accessibility with Python</strong> – PyCon US 2021
        poster by <a href="https://github.com/thibaudcolas">Thibaud Colas</a>.
        Code MIT-licensed on GitHub (
        <a href="https://github.com/thibaudcolas/accessibility-loves-python">
          thibaudcolas/accessibility-loves-python
        </a>
        ). Text contents available as{" "}
        <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>.
        Emoji credits: <a href="https://github.com/mozilla/fxemoji">FxEmojis</a>
        . Live site hosted on <a href="https://vercel.com/">Vercel</a>. Link:{" "}
        <a href="https://thib.me/python-ftw">thib.me/python-ftw</a>.
      </p>
    </footer>
  );
};

export default Footer;
