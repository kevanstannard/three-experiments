import { render } from "../../modules/render";
import { LayoutWithScript } from "../../components/layout";
import { script } from "./script";

render(<LayoutWithScript pageName="Frames Per Second" script={script} />);
