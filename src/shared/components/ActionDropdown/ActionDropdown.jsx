import {useEffect, useRef, useState} from "react";
import {MoreHorizontal} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import "./ActionDropdown.css";

export default function ActionDropdown({items = [], align = "right"}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    function toggleDropdown() {
        setIsOpen((currentValue) => !currentValue);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    function handleItemClick(item) {
        item.onClick?.();
        closeDropdown();
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }

        function handleEscapeKey(event) {
            if (event.key === "Escape") {
                closeDropdown();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    return (
        <div className="action-dropdown" ref={dropdownRef}>
            <button
                type="button"
                className={`action-dropdown-trigger ${isOpen ? "active" : ""}`}
                onClick={toggleDropdown}
                aria-label="Open actions menu"
            >
                <MoreHorizontal size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`action-dropdown-menu action-dropdown-menu-${align}`}
                        initial={{opacity: 0, y: -8, scale: 0.96}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -6, scale: 0.96}}
                        transition={{duration: 0.18, ease: "easeOut"}}
                    >
                        {items.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    className={`action-dropdown-item ${item.danger ? "danger" : ""}`}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {Icon && <Icon size={17} />}
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
