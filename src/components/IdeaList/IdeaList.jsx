// IdeaList.jsx
import { Link } from "react-router-dom";

const IdeaList = ({ ideas }) => {
  return (
    <main>
      <h1>Ideas</h1>
      {ideas.map((idea) => {
        // Calculate like and dislike counts
        const likesCount = idea.reactions.filter(
          (reaction) => reaction.type === "Like"
        ).length;
        const dislikesCount = idea.reactions.filter(
          (reaction) => reaction.type === "Dislike"
        ).length;

        return (
          <article key={idea._id}>
            <header>
              <Link to={`/ideas/${idea._id}`}>
                <h2>{idea.title}</h2>
              </Link>
              {idea.anonymity === "Non-Anonymous" ? (
                <p>
                  {idea.author.username} posted on{" "}
                  {new Date(idea.createdAt).toLocaleDateString()}
                </p>
              ) : (
                <p>
                  Anonymous posted on{" "}
                  {new Date(idea.createdAt).toLocaleDateString()}
                </p>
              )}
            </header>
            <p>{idea.text}</p>
            <div>
              <p>Likes: {likesCount}</p>
              <p>Dislikes: {dislikesCount}</p>
              <p>Number of Comments: {idea.comments.length}</p>
            </div>
          </article>
        );
      })}
    </main>
  );
};

export default IdeaList;
