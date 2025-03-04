import { useState, useEffect, useContext } from "react";
import * as ideaService from "../../services/ideaService";
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import ReactionForm from "../ReactionForm/ReactionForm";

const IdeaDetails = (props) => {
  const [idea, setIdea] = useState(null);
  const { ideaId } = useParams();
  const { user } = useContext(UserContext);
  // console.log('ideaId', ideaId);

  const handleAddComment = async (commentFormData) => {
    const newComment = await ideaService.createComment(ideaId, commentFormData);
    setIdea({ ...idea, comments: [...idea.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    console.log("commentId:", commentId);
    const deletedComment = await ideaService.deleteComment(ideaId, commentId);
    setIdea({
      ...idea,
      comments: idea.comments.filter((comment) => comment._id !== commentId),
    });
  };

  useEffect(() => {
    const fetchIdea = async () => {
      const ideaData = await ideaService.show(ideaId);
      setIdea(ideaData);
    };
    fetchIdea();
  }, [ideaId]);

  if (!idea) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <h1>{idea.title.toUpperCase()}</h1>
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
          <h2>Description : {idea.description}</h2>
          <h2>Key Benefits : {idea.keyBenefits}</h2>
          <h2>Implementation Plan : {idea.implementationPlan}</h2>
          {idea.author._id === user._id ? (
            <>
              <Link to={`/ideas/${ideaId}/edit`}>
                Edit Idea
              </Link>
              <button onClick={() => {props.handleDeleteIdea(idea._id)}}>
                Delete Idea
              </button>
            </>
          ) : (
            <></>
          )}
        </header>
        <section>
          <h2>Reactions </h2>
          <ReactionForm />
        </section>
        <p>{idea.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!idea.comments.length && <p>There are no comments.</p>}

        {idea.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                {comment.anonymity === "Non-Anonymous" ? (
                  <p>
                    {comment.author.username} posted on{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                ) : (
                  <p>
                    Anonymous posted on{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                )}
                <p>{comment.text}</p>
                {comment.author._id === user._id ? (
                  <>
                    <Link to={`/ideas/${ideaId}/comments/${comment._id}/edit`}>
                      Edit Comment
                    </Link>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      Delete Comment
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </header>
          </article>
        ))}
      </section>
    </main>
  );
};

export default IdeaDetails;
