import {X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import "./Modal.css";

export default function Modal({isOpen, onClose, title, description, children, size = "md"}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    onClick={onClose}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.22}}
                >
                    <motion.div
                        className={`modal-panel modal-panel-${size}`}
                        onClick={(event) => event.stopPropagation()}
                        initial={{opacity: 0, y: 24, scale: 0.96}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 18, scale: 0.96}}
                        transition={{
                            duration: 0.28,
                            ease: "easeOut",
                        }}
                    >
                        <div className="modal-header">
                            <div>
                                {title && <h2>{title}</h2>}
                                {description && <p>{description}</p>}
                            </div>

                            <button className="modal-close-btn" onClick={onClose}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="modal-body">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
