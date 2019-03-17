import Comments from "../components/Comments";
import Html from "../components/Html";
import ItemMeta from "../components/ItemMeta";
import Main from "../components/Main";
import { h } from "preact";
import { networkFirstFetch } from "../utils";
import { render } from "../utils";
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

export default async function renderPage(params) {
  const requestUrl = `https://api.hackerwebapp.com/item/${params.id}`;
  const { data, isOffline } = await networkFirstFetch(requestUrl);
  return render(
    <Html title={data.title} offline={isOffline}>
      <Page item={data} />
    </Html>
  );
}
