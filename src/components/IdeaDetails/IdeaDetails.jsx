import { useState, useEffect, useContext } from "react";
import * as ideaService from "../../services/ideaService";
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router-dom";
import ReactionForm from "../ReactionForm/ReactionForm";

const IdeaDetails = (props) => {
    const [idea, setIdea] = useState(null);
    const { ideaId } = useParams();
    const { user } = useContext(UserContext);

    const handleAddComment = async (commentFormData) => {
        const newComment = await ideaService.createComment(ideaId, commentFormData);
        setIdea({ ...idea, comments: [...(idea?.comments || []), newComment] });
    };

    const handleAddReaction = async (reactionFormData) => {
        const newReaction = await ideaService.createReaction(ideaId, reactionFormData);
        setIdea({ ...idea, reactions: [...(idea?.reactions || []), newReaction] });
    };

    const handleDeleteComment = async (commentId) => {
        await ideaService.deleteComment(ideaId, commentId);
        setIdea({
            ...idea,
            comments: idea?.comments?.filter((comment) => comment._id !== commentId) || [],
        });
    };

    useEffect(() => {
        const fetchIdea = async () => {
            const ideaData = await ideaService.show(ideaId);
            setIdea(ideaData);
        };
        fetchIdea();
    }, [ideaId]);

    if (!idea) return <main className="pt-20 p-4">Loading...</main>;

    return (
        <main className="pt-20 p-4 max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-md p-6 mb-8">
                <header className="mb-4 flex justify-between items-center">
                    <div className="text-center w-full">
                        <h1 className="text-2xl font-bold mb-2">{idea?.title?.toUpperCase()}</h1>
                        <p className="text-sm text-gray-600">
                            {idea?.anonymity === "Non-Anonymous"
                                ? `${idea?.author?.username} posted on ${new Date(idea?.createdAt).toLocaleDateString()}`
                                : `Anonymous posted on ${new Date(idea?.createdAt).toLocaleDateString()}`}
                        </p>
                    </div>
                </header>
                <div className="space-y-4">
                    <p><strong>Description:</strong> {idea?.description}</p>
                    <p><strong>Category:</strong> {idea?.category}</p>
                    <p><strong>Key Benefits:</strong> {idea?.keyBenefits}</p>
                    <p><strong>Implementation Plan:</strong> {idea?.implementationPlan}</p>
                </div>
                {idea?.author?._id === user?._id && (
                    <div className="mt-4 flex justify-center">
                        <div className="flex space-x-2">
                            <Link
                                to={`/ideas/${ideaId}/edit`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Edit Idea
                            </Link>
                            <button
                                onClick={() => props.handleDeleteIdea(idea._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Delete Idea
                            </button>
                        </div>
                    </div>
                )}
            </article>

            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-center">Reactions</h2>
                <ReactionForm handleAddReaction={handleAddReaction} />
                {!(idea?.reactions?.length > 0) && <p className="text-gray-500">There are no comments.</p>}
                {idea?.reactions?.map((reaction) => (
                    <article key={reaction._id} className="border-t pt-4 mt-4">
                        <header className="mb-2">
                            <p className="text-sm text-gray-600">
                                {`${reaction?.author?.username} posted on ${new Date(reaction?.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{reaction?.type}</p>
                    </article>
                ))}
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 text-center">Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {!(idea?.comments?.length > 0) && <p className="text-gray-500">There are no comments.</p>}
                {idea?.comments?.map((comment) => (
                    <article key={comment._id} className="border-t pt-4 mt-4">
                        <header className="mb-2">
                            <p className="text-sm text-gray-600">
                                {comment?.anonymity === "Non-Anonymous"
                                    ? `${comment?.author?.username} posted on ${new Date(comment?.createdAt).toLocaleDateString()}`
                                    : `Anonymous posted on ${new Date(comment?.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{comment?.text}</p>
                        {comment?.author?._id === user?._id && (
                            <div className="mt-2 flex justify-center"> {/* Centering div */}
                                <div className="flex space-x-2"> {/* Button container */}
                                    <Link
                                        to={`/ideas/${ideaId}/comments/${comment._id}/edit`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                        Edit Comment
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                        Delete Comment
                                    </button>
                                </div>
                            </div>
                        )}
                    </article>
                ))}
            </section>
        </main>
    );
};

export default IdeaDetails;