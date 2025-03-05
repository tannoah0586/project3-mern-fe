import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as ideaService from "../../services/ideaService";


const CommentForm = (props) => {
  const { commentId, ideaId } = useParams();
  console.log(commentId, ideaId);
  const [formData, setFormData] = useState({ 
    text: '',anonymity: 'Non-Anonymous', 
});
 
  const navigate = useNavigate();

useEffect(() => {
  const fetchIdea = async () => {
    const ideaData = await ideaService.show(ideaId);
    setFormData(ideaData.comments.find((comment) => comment._id === commentId));
  };
  if (ideaId && commentId) fetchIdea();

}, [ideaId, commentId]);



const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
};

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (ideaId && commentId){
      console.log("Form Data before update:", formData);
      ideaService.updateComment(ideaId, commentId, formData);
      navigate(`/ideas/${ideaId}`)
  }else {
      props.handleAddComment(formData);
      setFormData({ text: '', anonymity: 'Non-Anonymous'})
  }
};

  return (
<>
<br></br>

<br></br>
<br></br>
    <h1>Edit Comment</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment: </label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
        <label htmlFor='anonymity-input'>Anonymity: </label>
        <select
          required
          name='anonymity'
          id='anonymity-input'
          value={formData.anonymity}
          onChange={handleChange}
        >
          <option value='Non-Anonymous'>Non-Anonymous</option>
          <option value='Anonymous'>Anonymous</option>
        </select>
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  
    </>);
};

export default CommentForm;

