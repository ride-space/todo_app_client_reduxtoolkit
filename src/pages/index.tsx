import type { CustomNextPage } from "next";
import { AppLayout } from "src/layout";

const Index: CustomNextPage = () => {
  const foo = "index";
  return <div>{foo}</div>;
};

Index.getLayout = AppLayout;

export default Index;
