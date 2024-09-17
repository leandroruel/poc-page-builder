import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return <div id="root-page">{children}</div>;
};

export default Page;
