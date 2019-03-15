import Comments from "../components/Comments";
import ItemMeta from "../components/ItemMeta";
import { NotFoundError } from "../../lib/error";
import { h } from "preact";
import renderShell from "../shell";
/** @jsx h */

const Page = ({ item }) => (
  <Main>
    <h1 id="main-title">
      {item.type === "ask" ? (
        item.title
      ) : (
        <a href={item.url}>
          {item.title}{" "}
          {item.domain && (
            <span>
              <br />({item.domain})
            </span>
          )}
        </a>
      )}
    </h1>
    <ItemMeta item={item} />
    {item.content && <div dangerouslySetInnerHTML={{ __html: item.content }} />}
    <Comments comments={item.comments} comments_count={item.comments_count} />
  </Main>
);

function fetchData(params) {
  return fetch(`https://api.hackerwebapp.com/item/${params.id}`);
}

function getInitialProps(item) {
  const title = `${item.title}`;
  return { item, title };
}

export default {
  async render(params) {
    let data;
    const response = await fetchData(params);
    if (response.ok) {
      data = await response.json();
    } else {
      switch (response.status) {
        case 404:
          throw new NotFoundError("Page does not exist");
        default:
          throw new Error("Failed to fetch page");
      }
    }
    const { title, ...props } = getInitialProps(data);
    return renderShell(title, <Page {...props} />);
  }
};
