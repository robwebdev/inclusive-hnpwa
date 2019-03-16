import { h } from "preact";
/** @jsx h */

const Main = ({ children }) => (
  <main id="main" tabindex="-1" class="p-m">
    {children}
  </main>
);

export default Main;
