import { unsafeHTML } from "@popeindustries/lit-html-server/directives/unsafe-html";

const container = (html, { comments, comments_count }) =>
  html`
    <section>
      ${comments_count > 0
        ? html`
            <h2>Comments</h2>
          `
        : ""}
      ${comments_count > 0 ? commentsList(html, { comments }) : ""}
      ${comments_count === 0
        ? html`
            <p class="text-smaller">This story has no comments</p>
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
      <p class="item-meta"><b>${comment.user}</b> · ${comment.time_ago}</p>
      <div class="comments-list__item-content">
        ${unsafeHTML(
          comment.content.replace(/<p>&gt;/g, '<p class="quote">&gt;')
        )}
      </div>
      ${comment.comments.length
        ? commentsList(html, { comments: comment.comments })
        : ""}
    </li>
  `;
}

export default container;
