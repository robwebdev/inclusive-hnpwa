import Comments from "../components/Comments";
import Html from "../components/Html";
import ItemMeta from "../components/ItemMeta";
import Main from "../components/Main";
import { NotFoundError } from "../../lib/error";
import { h } from "preact";
import { render } from "preact-render-to-string";
/** @jsx h */

const Page = ({ item }) => (
  <Main className="p-m">
    <h1>
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

export default async function renderPage(params) {
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
  return render(
    <Html title={title}>
      <Page {...props} />
    </Html>
  );
}
