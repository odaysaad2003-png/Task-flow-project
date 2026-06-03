import {useState} from "react";
import Button from "../../../shared/components/Butoon/Button";
// @ts-ignore
import "../style/CreateProjectForm.css";

const INITIAL_FORM_STATE = {
    name: "",
    description: "",
    status: "active",
};

export default function CreateProjectForm({onSubmit, onCancel}) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const {name, value} = event.target;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
        }));
    }

    function validateForm() {
        const validationErrors = {};

        if (!formData.name.trim()) {
            validationErrors.name = "Project name is required.";
        }

        if (formData.name.trim().length > 60) {
            validationErrors.name = "Project name must be less than 60 characters.";
        }

        if (!formData.description.trim()) {
            validationErrors.description = "Project description is required.";
        }

        if (formData.description.trim().length > 180) {
            validationErrors.description = "Project description must be less than 180 characters.";
        }

        return validationErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit({
            name: formData.name.trim(),
            description: formData.description.trim(),
            status: formData.status,
        });

        setFormData(INITIAL_FORM_STATE);
        setErrors({});
    }

    return (
        <form className="create-project-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="project-name">Project name</label>

                <input
                    id="project-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Website Redesign"
                    value={formData.name}
                    onChange={handleChange}
                />

                {errors.
// @ts-ignore
                name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="form-field">
                <label htmlFor="project-description">Description</label>

                <textarea
                    id="project-description"
                    name="description"
                    // @ts-ignore
                    rows="4"
                    placeholder="Describe the goal of this project..."
                    value={formData.description}
                    onChange={handleChange}
                />

                {errors.
// @ts-ignore
                description && <p className="field-error">{errors.description}</p>}
            </div>

            <div className="form-field">
                <label htmlFor="project-status">Status</label>

                <select id="project-status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            <div className="form-actions">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>

                <Button type="submit">Create Project</Button>
            </div>
        </form>
    );
}
