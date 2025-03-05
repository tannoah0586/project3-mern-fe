import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import * as ideaService from '../../services/ideaService';

const CommentForm = (props) => {

  const { ideaId, commentId } = useParams();
  const [formData, setFormData] = useState({ 
    text: '',anonymity: 'Non-Anonymous', 
});

useEffect(()=> {
  const fetchIdea = async () => {
    const ideaData = await ideaService.show(ideaId);
    setFormData(ideaData.comments.find((comm)=>comm._id === commentId));
  };
  if (ideaId && commentId) fetchIdea();
},[ideaId,commentId]);

console.log("ideaId:", ideaId, "commentId:",commentId);

const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
};

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ text: '', anonymity: 'Non-Anonymous'});
  };

  return (
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
  );
};

export default CommentForm;

