import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TimelineBar } from './TimelineBar';
import './Timeline.css';

export interface Bar {
  id: string;
  barNumber: number;
  tempo: number;
  timeSignature: {
    numerator: number;
    denominator: number;
  };
}

interface TimelineProps {
  bars: Bar[];
  onBarsChange: (bars: Bar[]) => void;
  onBarEdit: (barId: string) => void;
}

export function Timeline({ bars, onBarsChange, onBarEdit }: TimelineProps) {
  const [selectedBarId, setSelectedBarId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = bars.findIndex((bar) => bar.id === active.id);
      const newIndex = bars.findIndex((bar) => bar.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newBars = arrayMove(bars, oldIndex, newIndex);
        // Update bar numbers
        const updatedBars = newBars.map((bar, index) => ({
          ...bar,
          barNumber: index + 1,
        }));
        onBarsChange(updatedBars);
      }
    }
  };

  const handleAddBar = () => {
    const lastBar = bars[bars.length - 1];
    const newBar: Bar = {
      id: `bar-${Date.now()}`,
      barNumber: bars.length + 1,
      tempo: lastBar?.tempo || 120,
      timeSignature: lastBar?.timeSignature || { numerator: 4, denominator: 4 },
    };
    onBarsChange([...bars, newBar]);
  };

  const handleDeleteBar = (barId: string) => {
    if (bars.length > 1) {
      const newBars = bars.filter((bar) => bar.id !== barId);
      // Update bar numbers
      const updatedBars = newBars.map((bar, index) => ({
        ...bar,
        barNumber: index + 1,
      }));
      onBarsChange(updatedBars);
      if (selectedBarId === barId) {
        setSelectedBarId(null);
      }
    }
  };

  const handleSelectBar = (barId: string) => {
    setSelectedBarId(barId);
    onBarEdit(barId);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h4>Timeline</h4>
        <button className="add-bar-button" onClick={handleAddBar}>
          + Add Bar
        </button>
      </div>

      <div className="timeline-scroll">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={bars.map((bar) => bar.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="timeline">
              {bars.map((bar) => (
                <TimelineBar
                  key={bar.id}
                  bar={bar}
                  isSelected={selectedBarId === bar.id}
                  onSelect={() => handleSelectBar(bar.id)}
                  onDelete={() => handleDeleteBar(bar.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="timeline-info">
        <p>Total bars: {bars.length}</p>
        <p>Drag bars to reorder • Click to edit • Delete with ×</p>
      </div>
    </div>
  );
}
