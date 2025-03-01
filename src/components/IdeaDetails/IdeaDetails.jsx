import { useState, useEffect } from 'react';
import * as ideaService from '../../services/ideaService'
import CommentForm from '../CommentForm/CommentForm';
import { UserContext } from '../../contexts/UserContext';
import { useParams, Link } from 'react-router';
import LikeForm from '../Likeform/LikeForm';

const IdeaDetails = (props) => {
    const [idea,setIdea] = useState(null);
    const { ideaId } = useParams();
    const { user } = useContext(UserContext);
    console.log('ideaId', ideaId);

    const handleAddComment = async (commentFormData) => {
        const newComment = await ideaService.createComment(ideaId, commentFormData);
        setIdea({ ...idea, comments: [...idea.comments, newComment] });
      };
    
    useEffect(()=> {
        const fetchIdea = async () => {
            const ideaData = await ideaService.show(ideaId);
            setIdea(ideaData);
        };
        fetchIdea();
    }, [ideaId])

    console.log('idea state:', idea);


    if (!idea) return <main>Loading...</main>;
  return (
    <main>
      <section>
        <header>
          {/* <p>{idea.category.toUpperCase()}</p> */}
          <h1>{idea.title.toUpperCase()}</h1>
          <h2>{idea.description}</h2>
          <p>
            {`${idea.author === null ? 'Anonymous' : idea.author.username} posted on 
              ${new Date(idea.createdAt).toLocaleDateString()}`}
          </p>
          {idea.originalAuthorId && idea.author._id === user._id && (
              <>
                <Link to={`/ideas/${ideaId}/edit`}>Edit</Link>
                <button onClick={()=> props.handleDeleteIdea(ideaId)}>
                    Delete
                </button>
              </>
            )}
        </header>
        <section>
          <h2>Likes</h2>
          <LikeForm />
        </section>
        <p>{idea.text}</p>
      </section>
      <section>
      <h2>Comments</h2>
        <CommentForm handleAddComment = {handleAddComment}/>
            {!idea.comments.length && <p>There are no comments.</p>}

            {idea.comments.map((comment) => (
            <article key={comment._id}>
                <header>
                <p>
                    {`${comment.author.username} posted on
                    ${new Date(comment.createdAt).toLocaleDateString()}`}
                </p>
                </header>
                <p>{comment.text}</p>
            </article>
            ))}
      </section>
    </main>
  );
}

export default IdeaDetails;