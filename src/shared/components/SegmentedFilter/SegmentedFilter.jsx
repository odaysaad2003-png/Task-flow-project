import "./SegmentedFilter.css";

export default function SegmentedFilter({options, value, onChange}) {
    return (
        <div className="segmented-filter">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={`segmented-filter-item ${value === option.value ? "active" : ""}`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
