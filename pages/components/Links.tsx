import Link from "next/link";
import React, { ReactNode } from "react";

export interface LinksState {
  text: ReactNode;
  href: URL;
}

const Links = ({ text, href }: LinksState) => {
  return <Link href={href}>{text}</Link>;
};

export default Links;
