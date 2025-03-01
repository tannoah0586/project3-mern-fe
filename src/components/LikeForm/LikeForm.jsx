import { useState } from 'react';
import * as ideaService from '../../services/ideaService';
import { useParams, useNavigate } from 'react-router';


const LikeForm = () => {
    const [formData, setFormData] = useState({
        like: "Like", //default setting
    })

    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const { ideaId, likeId } = useParams();
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        ideaService.createLike(ideaId,formData); //create likes/dislikes
        navigate(`/ideas/${ideaId}`);
}

return (
 <form onSubmit={handleSubmit}>
        <label htmlFor='like-input'>Like / Dislike: </label>
        <select
          required
          name='like'
          id='like-input'
          value={formData.like}
          onChange={handleChange}
        >
          <option value='Like'>Like</option>
          <option value='Dislike'>Dislike</option>
        </select>
        <button type='submit'>SUBMIT</button>
 </form>
)};


export default LikeForm;