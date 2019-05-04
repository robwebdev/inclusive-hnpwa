export default function({ html }, { item }) {
  return item.domain
    ? html`
        <p class="item-domain__site-url font-sans-serif">
          <img
            src="${`https://api.faviconkit.com/${item.domain}/16`}"
            alt=""
            class="item-domain__favicon"
          />
          <span class="visually-hidden">External link to </span
          ><span id="item-domain-${item.id}">${item.domain}</span>
        </p>
      `
    : "";
}
