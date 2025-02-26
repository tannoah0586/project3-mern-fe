import { useState,useEffect } from 'react';
import { useParams } from 'react-router';
import * as hootService from '../../services/hootService';


const IdeaForm = (props) => {
    const { ideaId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    anonymity: 'Non-Anonymous',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (ideaId) {
        props.handleUpdateHoot(ideaId, formData);
      } else {
        props.handleAddHoot(formData);
      }
  };

  useEffect(() => {
    const fetchIdea = async () => {
      const ideaData = await ideaService.show(ideaId);
      setFormData(ideaData);
    };
    if (ideaId) fetchIdea();
    return () => setFormData({ title: '', text: '', category: 'News' });
  }, [ideaId]);

  return (
    <main>
        <h1>{ideaId ? 'Edit Idea' : 'New Idea'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='description-input'>Description</label>
        <textarea
          required
          type='text'
          name='description'
          id='description-input'
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor='anonymity-input'>Anonymity</label>
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
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default IdeaForm;
