'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';
import { useEditMode } from '@/context/EditModeContext';

interface EditableTextProps {
    contentId: string;
    defaultValue: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    className?: string;
    style?: React.CSSProperties;
}

export default function EditableText({
    contentId,
    defaultValue,
    tag: Tag = 'span',
    className = '',
    style,
}: EditableTextProps) {
    const { editMode, contents, updateContent } = useEditMode();
    const ref = useRef<HTMLElement>(null);
    const currentValue = contents[contentId] ?? defaultValue;

    // Update DOM content when value changes from external source
    useEffect(() => {
        if (ref.current && !editMode) {
            ref.current.textContent = currentValue;
        }
    }, [currentValue, editMode]);

    // Set initial content when entering edit mode
    useEffect(() => {
        if (ref.current && editMode) {
            ref.current.textContent = currentValue;
        }
    }, [editMode]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleBlur = () => {
        if (ref.current) {
            const newValue = ref.current.textContent?.trim() || '';
            if (newValue && newValue !== currentValue) {
                updateContent(contentId, newValue);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        // Prevent Enter from creating new lines in inline elements
        if (e.key === 'Enter' && Tag !== 'p' && Tag !== 'div') {
            e.preventDefault();
            (e.target as HTMLElement).blur();
        }
    };

    if (editMode) {
        return (
            // @ts-ignore — dynamic tag
            <Tag
                ref={ref as any}
                className={`editable-text editable-active ${className}`}
                style={style}
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        );
    }

    // Normal mode — plain render
    return (
        // @ts-ignore — dynamic tag
        <Tag className={className} style={style}>
            {currentValue}
        </Tag>
    );
}
