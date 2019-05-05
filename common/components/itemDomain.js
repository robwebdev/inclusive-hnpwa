export default function({ html }, { item }) {
  return item.domain
    ? html`
        <p class="item-domain__site-url">
          <img
            src="${`/favicon/${item.domain}`}"
            alt=""
            class="item-domain__favicon"
            loading="lazy"
          />
          <span class="visually-hidden">External link to </span
          ><span id="item-domain-${item.id}">${item.domain}</span>
        </p>
      `
    : "";
}
