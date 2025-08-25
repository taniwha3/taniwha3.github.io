import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Bar } from './Timeline';
import './TimelineBar.css';

interface TimelineBarProps {
  bar: Bar;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function TimelineBar({
  bar,
  isSelected,
  onSelect,
  onDelete,
}: TimelineBarProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: bar.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`timeline-bar ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={onSelect}
      {...attributes}
    >
      <div className="bar-drag-handle" {...listeners} aria-label="Drag to reorder">
        ⋮⋮
      </div>

      <div className="bar-content">
        <div className="bar-number">Bar {bar.barNumber}</div>
        <div className="bar-tempo">{bar.tempo} BPM</div>
        <div className="bar-time-signature">
          {bar.timeSignature.numerator}/{bar.timeSignature.denominator}
        </div>
      </div>

      <button
        className="bar-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Delete bar"
      >
        ×
      </button>
    </div>
  );
}
