import { render } from "./modules/render";
import { Layout } from "./components/layout";

import { experiments } from "../experiment";

function Index() {
  return (
    <Layout pageName="Home">
      <ul style={{ padding: 0 }}>
        {experiments.map((experiment) => {
          return (
            <li key={experiment.id} style={{ padding: "0.5em 1em" }}>
              <a
                href={`/${experiment.id}.html`}
                style={{ textDecoration: "none", color: "white" }}
              >
                {experiment.name}
              </a>
              &nbsp;
              <span style={{ color: "gray" }}>{experiment.description}</span>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

render(<Index />);
