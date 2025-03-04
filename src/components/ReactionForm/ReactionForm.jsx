import { useState } from 'react';
import * as ideaService from '../../services/ideaService';
import { useParams, useNavigate } from 'react-router';


const ReactionForm = () => {
    const [formData, setFormData] = useState({
        type: "Like", //default setting
    })

    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const { ideaId, likeId } = useParams();
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        ideaService.createReaction(ideaId,formData); //create likes/dislikes
        navigate(`/ideas`);
}

return (
 <form onSubmit={handleSubmit}>
        <label htmlFor='reaction-input'>Like / Dislike: </label>
        <select
          required
          name='type'
          id='reaction-input'
          value={formData.type}
          onChange={handleChange}
        >
          <option value='Like'>Like</option>
          <option value='Dislike'>Dislike</option>
        </select>
        <button type='submit'>SUBMIT</button>
 </form>
)};


export default ReactionForm;