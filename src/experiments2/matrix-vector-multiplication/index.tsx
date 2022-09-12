import { render } from "../../modules/render";
import { LayoutWithScript } from "../../components/layout";
import { script } from "./script";

render(
  <LayoutWithScript pageName="Matrix Vector Multiplication" script={script} />
);
