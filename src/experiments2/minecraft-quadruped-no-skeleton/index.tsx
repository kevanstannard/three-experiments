import { render } from "../../modules/render";
import { LayoutWithScript } from "../../components/layout";
import { script } from "./script";

render(
  <LayoutWithScript
    pageName="Minecraft Quadruped without Skeleton"
    script={script}
  />
);
