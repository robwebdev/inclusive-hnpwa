import { apiFetch } from "../fetch";
import layout from "../components/layout";
import newsList from "../components/newsList";
import { nextPage } from "../utils";
import { offlineBody } from "./offline";

async function renderBody(html, page = "1") {
  const requestUrl = `https://api.hackerwebapp.com/ask?page=${page}`;
  try {
    const { data, isOffline } = await apiFetch(requestUrl);
    return newsList(html, { news: data, page, heading: "Ask HN", isOffline });
  } catch (e) {
    return offlineBody(html);
  }
}

export default async function renderPage({ html }, params, { page = "1" }) {
  const body = renderBody(html, page);
  return layout(html, { body, title: "Ask" });
}
