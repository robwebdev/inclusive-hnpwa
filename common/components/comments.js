import { pluralize } from "../utils";
import { unsafeHTML } from "@popeindustries/lit-html-server/directives/unsafe-html";

const container = (html, { comments, comments_count }) =>
  html`
    <section>
      ${comments_count > 0
        ? html`
            <h2>${pluralize(comments_count, "comment")}</h2>
          `
        : ""}
      ${comments_count > 0 ? commentsList(html, { comments }) : ""}
      ${comments_count === 0
        ? html`
            <p>This story has no comments</p>
          `
        : ""}
    </section>
  `;

function commentsList(html, { comments }) {
  return html`
    <ul class="comments-list">
      ${comments.map(c => comment(html, c))}
    </ul>
  `;
}

function comment(html, comment) {
  return html`
    <li class="comments-list__item">
      <p class="item-meta font-sans-serif">
        ${comment.level === 0 ? "Comment" : "Reply"} by ${comment.user}${" "}
        ${comment.time_ago}
      </p>
      <div class="comments-list__item-content">
        ${unsafeHTML(comment.content)}
      </div>
      ${commentsList(html, { comments: comment.comments })}
    </li>
  `;
}

export default container;
