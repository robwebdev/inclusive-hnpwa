import { h } from "preact";
/** @jsx h */

const Main = ({ children }) => (
  <main id="main" tabindex="-1" class="ph-m pv-l">
    {children}
  </main>
);

export default Main;
