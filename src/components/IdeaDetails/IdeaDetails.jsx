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
        <main className="pt-20 p-4 max-w-xl mx-auto">
            {/* ... other code ... */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {!(idea?.comments?.length > 0) && <p className="text-gray-500">There are no comments.</p>}
                {idea?.comments?.map((comment) => (
                    <article key={comment._id} className="border-t pt-4 mt-4">
                        {/* ... other comment content ... */}
                        {comment?.author?._id === user?._id && (
                            <div className="mt-2 flex space-x-2">
                                <Link
                                    to={`/ideas/${ideaId}/comments/${comment._id}/edit`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Edit Comment
                                </Link>
                                <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete Comment
                                </button>
                            </div>
                        )}
                    </article>
                ))}
            </section>
        </main>
    );
};

export default IdeaDetails;