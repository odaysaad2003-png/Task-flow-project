import "./Button.css";

export default function Button({children, icon: Icon, variant = "primary", onClick, type = "button"}) {
    return (
        <button type={type} className={`app-button app-button-${variant}`} onClick={onClick}>
            {Icon && <Icon size={18} />}
            <span>{children}</span>
        </button>
    );
}
