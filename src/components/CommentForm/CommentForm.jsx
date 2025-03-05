import { useState } from 'react';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ 
    text: '',anonymity: 'Non-Anonymous', 
});

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

