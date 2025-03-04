// IdeaList.jsx
import { Link } from "react-router-dom";

const IdeaList = ({ ideas }) => {
  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Ideas</h1>
      <div className="grid gap-4">
        {ideas.map((idea) => {
          const likesCount = idea.reactions.filter(
            (reaction) => reaction.type === "Like"
          ).length;
          const dislikesCount = idea.reactions.filter(
            (reaction) => reaction.type === "Dislike"
          ).length;

          return (
            <Link
              to={`/ideas/${idea._id}`}
              key={idea._id}
              className="block bg-pink-200 text-black p-4 rounded-xl shadow-md w-56 text-center hover:bg-pink-300 transition duration-200"
            >
              <h3 className="font-bold text-sm">{idea.title}</h3>
              <p className="text-xs text-gray-700 mt-1">
                {likesCount} Likes • {dislikesCount} Dislikes
              </p>
              <p className="text-xs text-gray-700">
                {idea.comments.length} Comments
              </p>
              <div className="border-t border-gray-300 mt-3 pt-2 text-gray-600 text-xs flex flex-col items-center">
                <span className="flex items-center gap-1">
                  <span className="text-sm">👤</span>{" "}
                  {idea.anonymity === "Non-Anonymous"
                    ? idea.author.username
                    : "Anonymous"}
                </span>
                <span className="text-[10px]">
                  {new Date(idea.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default IdeaList;