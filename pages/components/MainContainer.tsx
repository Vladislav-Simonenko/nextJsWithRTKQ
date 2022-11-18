import Link from "next/link";
import React from "react";

const MainContainer = ({ children }: any) => {
  return (
    <>
      <div className="navbar">
        <Link className="links" href="/">
          Главная
        </Link>
        <Link className="links" href="/users">
          Пользователи
        </Link>
        <Link className="links" href="/users">
          Пользователи
        </Link>
        <Link className="links" href="/users">
          Пользователи
        </Link>
      </div>
      <div>{children}</div>
    </>
  );
};

export default MainContainer;
