import { pluralize } from "../utils";

const Container = ({ comments, comments_count }) => (
  <section>
    {comments_count > 0 && <h2>{pluralize(comments_count, "comment")}</h2>}
    {comments_count > 0 && <Comments comments={comments} />}
    {comments_count === 0 && <p>This story has no comments</p>}
  </section>
);

const Comments = ({ comments }) => (
  <section>
    <ul class="comments-list">
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
    </ul>
  </section>
);

const Comment = ({ comment }) => (
  <li class="comments-list__item">
    <article>
      <p class="item-meta font-sans-serif">
        {comment.level === 0 ? "Comment" : "Reply"} by {comment.user}{" "}
        {comment.time_ago}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: comment.content }}
        class="comments-list__item-content"
      />
      <Comments comments={comment.comments} />
    </article>
  </li>
);

export default Container;
