import React from "react";

interface LayoutProps {
  pageName: string;
  children?: React.ReactNode;
}

export function Layout({ pageName, children }: LayoutProps) {
  return (
    <div>
      <div style={{ padding: "1em", color: "grey" }}>
        <a href="index.html" style={{ color: "grey" }}>
          Three.js Examples
        </a>
        &nbsp; → &nbsp;
        {pageName}
      </div>
      {children}
    </div>
  );
}

interface LayoutWithScriptProps {
  script: () => void;
  pageName: string;
}

export function LayoutWithScript({ script, pageName }: LayoutWithScriptProps) {
  React.useLayoutEffect(() => {
    script();
  }, []);
  return <Layout pageName={pageName} />;
}
