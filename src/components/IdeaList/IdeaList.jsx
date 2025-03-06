import { Link } from "react-router-dom";

const IdeaList = ({ ideas }) => {
    const bgColors = [
        "bg-violet-100 hover:violet-400",
        "bg-lime-100 hover:bg-lime-300",
        "bg-yellow-100 hover:bg-amber-200",
        "bg-purple-50 hover:bg-purple-300",
    ];

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-6">Ideas</h1>
            <div className="grid grid-cols-7 gap-6"> {/* Modified grid class */}
                {ideas?.map((idea, index) => {
                    const likesCount = idea?.reactions?.filter((reaction) => reaction.type === "Like").length || 0;
                    const dislikesCount = idea?.reactions?.filter((reaction) => reaction.type === "Dislike").length || 0;
                    const bgColor = bgColors[index % bgColors.length]; // Cycle through colors

                    return (
                        <Link
                            to={`/ideas/${idea?._id}`}
                            key={idea?._id}
                            className={`block ${bgColor} text-black p-6 rounded-xl shadow-md transition duration-200 w-[250px] min-h-[250px] flex flex-col justify-between`}
                        >
                            <h3 className="font-bold text-lg mb-2 overflow-hidden whitespace-wrap text-ellipsis">{idea?.title}</h3>
                            <p className="text-sm text-gray-700 mb-1">
                                {likesCount} Likes • {dislikesCount} Dislikes
                            </p>
                            <p className="text-sm text-gray-700 mb-3">
                                {idea?.comments?.length || 0} Comments
                            </p>
                            <div className="border-t border-gray-300 pt-3 text-sm text-gray-600 flex flex-col items-center">
                                <span className="flex items-center gap-1">
                                    <span className="text-base">👤</span>
                                    {idea?.anonymity === "Non-Anonymous" ? idea?.author?.username : "Anonymous"}
                                </span>
                                <span className="text-xs mt-1">
                                    {new Date(idea?.createdAt).toLocaleDateString()}
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