import { Link } from 'react-router'

const IdeaList = (props) => {
    return (

        <main>
            {props.ideas.map((idea)=>(
                <Link key={idea._id} to={`/ideas/${idea._id}`}>
                    <article>
                        <header>
                            <h2>{idea.title}</h2>
                            <p>
                            {`${idea.author === null ? 'Anonymous' : idea.author.username} posted on 
                            ${new Date(idea.createdAt).toLocaleDateString()}`}
                            </p>
                            <p>
                                Number of Comments: {idea.comments.length};
                                Number of Likes: {idea.likes.length};
                             </p>
                        </header>
                        <p>{idea.text}</p>
                    </article>
                </Link>
            ))};
        </main>
    );
};
export default IdeaList;