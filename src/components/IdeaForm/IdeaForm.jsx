import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as ideaService from "../../services/ideaService";

const IdeaForm = (props) => {
  const { ideaId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    anonymity: "Non-Anonymous",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (ideaId) {
      console.log("Form Data before update:", formData);
      props.handleUpdateIdea(ideaId, formData);
    } else {
      props.handleAddIdea(formData);
    }
  };

  useEffect(() => {
    const fetchIdea = async () => {
      const ideaData = await ideaService.show(ideaId);
      setFormData(ideaData);
    };
    if (ideaId) fetchIdea();
    return () =>
      setFormData({ title: "", description: "", anonymity: "Non-Anonymous" });
  }, [ideaId]);

  return (
    <main>
      <h1>{ideaId ? "Edit Idea" : "New Idea"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Productivity">Productivity</option>
          <option value="Staff-Welfare">Staff Welfare</option>
          <option value="Service-Quality">Service Quality</option>
        </select>
        <label htmlFor="description-input">Description</label>
        <textarea
          required
          type="text"
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="keyBenefits-input">Key Benefits</label>
        <textarea
          required
          type="text"
          name="keyBenefits"
          id="keyBenefits-input"
          value={formData.keyBenefits}
          onChange={handleChange}
        />
        <label htmlFor="implementationPlan-input">Implementation Plan</label>
        <textarea
          required
          type="text"
          name="implementationPlan"
          id="implementationPlan-input"
          value={formData.implementationPlan}
          onChange={handleChange}
        />
        <label htmlFor="anonymity-input">Anonymity</label>
        <select
          required
          name="anonymity"
          id="anonymity-input"
          value={formData.anonymity}
          onChange={handleChange}
        >
          <option value="Non-Anonymous">Non-Anonymous</option>
          <option value="Anonymous">Anonymous</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default IdeaForm;
