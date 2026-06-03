import {Search, X} from "lucide-react";
import "./SearchInput.css";

export default function SearchInput({value, onChange, placeholder = "Search...", onClear}) {
    const hasValue = value.trim().length > 0;

    return (
        <div className="search-input">
            <Search size={18} />

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />

            {hasValue && (
                <button type="button" className="search-clear-btn" onClick={onClear} aria-label="Clear search">
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
