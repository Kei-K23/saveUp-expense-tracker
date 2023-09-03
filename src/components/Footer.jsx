const Footer = () => (
  <footer className="w-full bg-black text-slate-200 p-4 lg:py-8 lg:px-16">
    <p className="text-center text-lg lg:text-2xl">
      © 2023 SaveUp expense tracker. All Rights Reserved.
    </p>
    <p className="text-center text-lg lg:text-2xl mt-4">
      Create with 💙 by{" "}
      <span>
        {" "}
        <a
          className="text-blue-400"
          href="https://github.com/Kei-K23"
          aria-label="follow me on GitHub Kei-K"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Kei-K
        </a>{" "}
      </span>
    </p>
  </footer>
);

export default Footer;
