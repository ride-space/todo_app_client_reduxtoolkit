import type { CustomNextPage } from "next";
import { AppLayout } from "src/layout";

const Index: CustomNextPage = () => {
  return <div>Index</div>;
};

Index.getLayout = AppLayout;

export default Index;
