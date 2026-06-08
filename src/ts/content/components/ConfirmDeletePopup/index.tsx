import React, { useEffect } from "react";
import "./index.scss";

interface ConfirmDeletePopupProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDeletePopup = ({ onConfirm, onCancel }: ConfirmDeletePopupProps) => {
    // закриття по Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onCancel]);

    return (
        <div className="cdp-overlay" onClick={onCancel}>
            <div className="cdp" onClick={(e) => e.stopPropagation()}>
                <div className="cdp__icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                    </svg>
                </div>

                <h3 className="cdp__title">Delete comment?</h3>
                <p className="cdp__desc">This action cannot be undone.</p>

                <div className="cdp__actions">
                    <button className="cdp__btn cdp__btn--cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="cdp__btn cdp__btn--confirm" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeletePopup;