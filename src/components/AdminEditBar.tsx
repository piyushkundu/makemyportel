'use client';

import { useEditMode } from '@/context/EditModeContext';
import { Pencil, Save, X, Check, Loader2 } from 'lucide-react';

export default function AdminEditBar() {
    const { isAdmin, editMode, toggleEditMode, saveAll, saving, hasChanges, changesCount } = useEditMode();

    // Don't show anything for non-admins
    if (!isAdmin) return null;

    return (
        <div className="admin-edit-bar">
            {editMode ? (
                <>
                    <div className="edit-bar-status">
                        <span className="edit-bar-dot" />
                        <span>Edit Mode ON</span>
                    </div>

                    {/* Always show Save button in edit mode */}
                    <button
                        className="edit-bar-btn edit-bar-save"
                        onClick={saveAll}
                        disabled={saving || !hasChanges}
                    >
                        {saving ? (
                            <><Loader2 size={16} className="edit-bar-spin" /> Saving...</>
                        ) : hasChanges ? (
                            <><Save size={16} /> Save ({changesCount})</>
                        ) : (
                            <><Check size={16} /> Saved ✓</>
                        )}
                    </button>

                    <button
                        className="edit-bar-btn edit-bar-exit"
                        onClick={() => {
                            if (hasChanges) {
                                if (confirm('You have unsaved changes. Save before exiting?')) {
                                    saveAll().then(toggleEditMode);
                                    return;
                                }
                            }
                            toggleEditMode();
                        }}
                    >
                        <X size={16} /> Exit
                    </button>
                </>
            ) : (
                <button
                    className="edit-bar-btn edit-bar-enter"
                    onClick={toggleEditMode}
                >
                    <Pencil size={16} /> Edit Page
                </button>
            )}
        </div>
    );
}
