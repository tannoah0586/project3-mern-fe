import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = ({ ideas }) => {
    const { user } = useContext(UserContext);

    const bgColors = [
        "bg-pink-200 hover:bg-pink-300",
        "bg-blue-200 hover:bg-blue-300",
        "bg-green-200 hover:bg-green-300",
        "bg-yellow-200 hover:bg-yellow-300",
        "bg-purple-200 hover:bg-purple-300",
    ];

    return (
        <main className="pt-40 p-4">
            <div className="fixed top-25 left-1/2 -translate-x-1/2 z-40">
                <Link
                    to="/ideas/new"
                    className="py-3 px-6 text-lg rounded-full text-white bg-gradient-to-b from-pink-400 to-green-400 hover:from-pink-500 hover:to-green-500"
                >
                    + Share a new idea
                </Link>
            </div>
            <div className="w-3/3 mx-auto h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent my-6"></div>
            <h1>Welcome, {user.username}</h1>
            <p>This is the dashboard page where you can see a list of all ideas sorted by their popularity</p>
            <br />
            <h1>Top Ideas</h1>
            <div className="flex flex-row space-x-6 overflow-x-auto">
                {ideas
                    .map((idea) => ({
                        ...idea,
                        likesCount: idea.reactions.filter((reaction) => reaction.type === "Like").length,
                    }))
                    .sort((a, b) => b.likesCount - a.likesCount)
                    .map((idea, index) => {
                        const bgColor = bgColors[index % bgColors.length];
                        return (
                            <Link
                                to={`/ideas/${idea._id}`}
                                key={idea._id}
                                className={`block ${bgColor} text-black p-6 rounded-xl shadow-md transition duration-200 min-w-[250px]`}
                            >
                                <h3 className="font-bold text-lg mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                                    {idea.title}
                                </h3>
                                <p className="text-sm text-gray-700 mb-1">{idea.likesCount} Likes</p>
                                <p className="text-sm text-gray-700 mb-3">{idea.comments.length} Comments</p>
                                <div className="border-t border-gray-300 pt-3 text-sm text-gray-600 flex flex-col items-center">
                                    <span className="flex items-center gap-1">
                                        <span className="text-base">👤</span>
                                        {idea.anonymity === "Non-Anonymous" ? idea.author.username : "Anonymous"}
                                    </span>
                                    <span className="text-xs mt-1">
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

export default Dashboard;