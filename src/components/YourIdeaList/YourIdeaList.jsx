import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const YourIdeaList = ({ ideas }) => {
    
    const { user } = useContext(UserContext);
    console.log(ideas,user)

    const bgColors = [
        "bg-pink-200 hover:bg-pink-300",
    ];

    const yourIdeas = ideas.filter((idea) => idea?.author?._id === user?._id);
    console.log(yourIdeas)


    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-6">Ideas</h1>
            <div className="flex flex-row space-x-6 overflow-x-auto">
                {yourIdeas?.map((idea, index) => {
                    const likesCount = idea?.reactions?.filter((reaction) => reaction.type === "Like").length || 0;
                    const dislikesCount = idea?.reactions?.filter((reaction) => reaction.type === "Dislike").length || 0;
                    const bgColor = bgColors[index % bgColors.length]; // Cycle through colors

                    return (
                        <Link
                            to={`/ideas/${idea?._id}`}
                            key={idea?._id}
                            className={`block ${bgColor} text-black p-6 rounded-xl shadow-md transition duration-200 min-w-[250px]`} // Added min-w
                        >
                            <h3 className="font-bold text-lg mb-2 overflow-hidden whitespace-nowrap text-ellipsis">{idea?.title}</h3>
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

export default YourIdeaList;