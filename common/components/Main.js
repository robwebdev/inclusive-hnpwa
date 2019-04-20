import { h } from "preact";
/** @jsx h */

const Main = ({ children, className = "" }) => (
  <main id="main" tabindex="-1" class={className}>
    {children}
  </main>
);

export default Main;
