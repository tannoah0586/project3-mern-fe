import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as ideaService from '../../services/ideaService';

const IdeaForm = (props) => {
    const { ideaId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Productivity',
        description: '',
        keyBenefits: '',
        implementationPlan: '',
        anonymity: 'Non-Anonymous',
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
            setFormData({
                title: '',
                category: 'Productivity',
                description: '',
                keyBenefits: '',
                implementationPlan: '',
                anonymity: 'Non-Anonymous',
            });
    }, [ideaId]);

    return (
        <main className="flex justify-center items-center min-h-screen p-4">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-xl w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {ideaId ? 'Edit Idea' : 'New Idea'}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title-input" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            required
                            type="text"
                            name="title"
                            id="title-input"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="category-input" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            required
                            name="category"
                            id="category-input"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="Productivity">Productivity</option>
                            <option value="Staff Welfare">Staff Welfare</option>
                            <option value="Service Quality">Service Quality</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description-input" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            required
                            name="description"
                            id="description-input"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="keyBenefits-input" className="block text-sm font-medium text-gray-700">
                            Key Benefits
                        </label>
                        <textarea
                            required
                            name="keyBenefits"
                            id="keyBenefits-input"
                            value={formData.keyBenefits}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="implementationPlan-input" className="block text-sm font-medium text-gray-700">
                            Implementation Plan
                        </label>
                        <textarea
                            required
                            name="implementationPlan"
                            id="implementationPlan-input"
                            value={formData.implementationPlan}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="anonymity-input" className="block text-sm font-medium text-gray-700">
                            Anonymity
                        </label>
                        <select
                            required
                            name="anonymity"
                            id="anonymity-input"
                            value={formData.anonymity}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="Non-Anonymous">Non-Anonymous</option>
                            <option value="Anonymous">Anonymous</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </main>
    );
};

export default IdeaForm;