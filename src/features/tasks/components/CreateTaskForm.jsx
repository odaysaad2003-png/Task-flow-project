import {useState} from "react";
import Button from "../../../shared/components/Butoon/Button";
import "../style/CreateTaskForm.css";

const INITIAL_FORM_STATE = {
    projectId: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
};

export default function CreateTaskForm({
    projects,
    onSubmit,
    onCancel,
    initialValues = INITIAL_FORM_STATE,
    submitLabel = "Create Task",
}) {
    const [formData, setFormData] = useState(initialValues);
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

        if (!formData.projectId) {
            validationErrors.projectId = "Please select a project.";
        }

        if (!formData.title.trim()) {
            validationErrors.title = "Task title is required.";
        }

        if (formData.title.trim().length > 80) {
            validationErrors.title = "Task title must be less than 80 characters.";
        }

        if (!formData.description.trim()) {
            validationErrors.description = "Task description is required.";
        }

        if (formData.description.trim().length > 220) {
            validationErrors.description = "Task description must be less than 220 characters.";
        }

        if (!formData.dueDate) {
            validationErrors.dueDate = "Due date is required.";
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
            projectId: formData.projectId,
            title: formData.title.trim(),
            description: formData.description.trim(),
            status: formData.status,
            priority: formData.priority,
            dueDate: formData.dueDate,
        });

        setFormData(INITIAL_FORM_STATE);
        setErrors({});
    }
    return (
        <form className="create-task-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="task-project">Project</label>

                <select id="task-project" name="projectId" value={formData.projectId} onChange={handleChange}>
                    <option value="">Select a project</option>

                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                {errors.projectId && <p className="field-error">{errors.projectId}</p>}
            </div>

            <div className="form-field">
                <label htmlFor="task-title">Task title</label>

                <input
                    id="task-title"
                    name="title"
                    type="text"
                    placeholder="e.g. Build responsive navbar"
                    value={formData.title}
                    onChange={handleChange}
                />

                {errors.title && <p className="field-error">{errors.title}</p>}
            </div>

            <div className="form-field">
                <label htmlFor="task-description">Description</label>

                <textarea
                    id="task-description"
                    name="description"
                    rows="4"
                    placeholder="Describe what should be done..."
                    value={formData.description}
                    onChange={handleChange}
                />

                {errors.description && <p className="field-error">{errors.description}</p>}
            </div>

            <div className="form-grid">
                <div className="form-field">
                    <label htmlFor="task-status">Status</label>

                    <select id="task-status" name="status" value={formData.status} onChange={handleChange}>
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="task-priority">Priority</label>

                    <select id="task-priority" name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="form-field">
                <label htmlFor="task-due-date">Due date</label>

                <input id="task-due-date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />

                {errors.dueDate && <p className="field-error">{errors.dueDate}</p>}
            </div>

            <div className="form-actions">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">{submitLabel}</Button>{" "}
            </div>
        </form>
    );
}
