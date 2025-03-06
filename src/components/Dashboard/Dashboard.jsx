import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = ({ ideas }) => {
    const { user } = useContext(UserContext);

    const bgColors = [
        "bg-red-100 hover:bg-rose-200",
        "bg-lime-100 hover:bg-lime-400",
        "bg-yellow-100 hover:bg-amber-200",
        "bg-rose-200 hover:bg-red-300",
    ];

    return (
        <main className="pt-40 p-4 flex">
            {/* Left Column */}
            <aside className="w-64 border-r pr-4 mr-4">
                <div className="mb-8">
                    <h1 className="text-xl font-bold">Welcome, <span className="font-bold">{user.username}</span></h1>
                </div>
                <nav className="space-y-2">
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-100 rounded">Home</Link>
                    <Link to="/ideas" className="block py-2 px-4 hover:bg-gray-100 rounded">All Ideas</Link>
                    <Link to="/ideas/your" className="block py-2 px-4 hover:bg-gray-100 rounded">Your Ideas</Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
                <div className="fixed top-27 right-4 z-40"> {/* Changed left-1/2 to right-4 */}
                    <Link
                        to="/ideas/new"
                        className="py-3 px-6 text-lg font-bold rounded-full text-white bg-gradient-to-b from-rose-300 to-lime-400 hover:from-rose-400 hover:to-lime-600"
                    >
                        + Share a new idea
                    </Link>
                </div>
                <div className="w-3/3 mx-auto h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent my-6"></div>
                <div className="pl-8">
                    <h1 className="text-3xl font-bold mt-8 text-center">Top Ideas</h1>
                    <div className="flex flex-row space-x-6 overflow-x-auto mt-8">
                        {ideas
                            .map((idea) => ({
                                ...idea,
                                likesCount: idea.reactions.filter((reaction) => reaction.type === "Like").length,
                            }))
                            .sort((a, b) => b.likesCount - a.likesCount)
                            .slice(0, 5)
                            .map((idea, index) => {
                                const bgColor = bgColors[index % bgColors.length];
                                return (
                                    <Link
                                        to={`/ideas/${idea._id}`}
                                        key={idea._id}
                                        className={`block ${bgColor} text-black p-6 rounded-xl shadow-md transition duration-200 w-[250px] min-h-[250px] flex flex-col justify-between`}
                                    >
                                        <h3 className="font-bold text-lg mb-2 overflow-hidden whitespace-wrap text-ellipsis">
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
                </div>
            </div>
        </main>
    );
};

export default Dashboard;