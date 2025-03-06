import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const YourIdeaList = ({ ideas }) => {
    
    const { user } = useContext(UserContext);
    console.log(ideas,user)

    const bgColors = [
        "bg-violet-100 hover:bg-violet-300",
    ];

    const yourIdeas = ideas.filter((idea) => idea?.author?._id === user?._id);
    console.log(yourIdeas)


    return (
        <main className="pt-40 p-4">
            {/* Top Section */}
            <div className="fixed top-27 left-1/2 -translate-x-1/2 z-40"> {/* Changed top-25 to top-32 */}
                <Link
                    to="/ideas/new"
                    className="py-3 px-6 text-lg rounded-full text-white text-bold bg-gradient-to-b from-violet-200 to-lime-300 hover:from-violet-400 hover:to-lime-600"
                    >
                    + Share a new idea
                </Link>
            </div>
            <div className="w-3/3 mx-auto h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent my-6"></div>

            <h1 className="text-3xl font-bold mb-6 text-center"> Your Ideas</h1>
            <div className="flex flex-row space-x-6 overflow-x-auto pl-8">
                {yourIdeas?.map((idea, index) => {
                    const likesCount = idea?.reactions?.filter((reaction) => reaction.type === "Like").length || 0;
                    const dislikesCount = idea?.reactions?.filter((reaction) => reaction.type === "Dislike").length || 0;
                    const bgColor = bgColors[index % bgColors.length];

                    return (
                        <Link
                            to={`/ideas/${idea?._id}`}
                            key={idea?._id}
                            className={`block ${bgColor} text-black p-6 rounded-xl shadow-md transition duration-200 min-w-[250px]`}
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