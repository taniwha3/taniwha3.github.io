import React, { useState, useRef, useEffect, useCallback } from 'react';
import './TempoDial.css';

interface TempoDialProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const TempoDial: React.FC<TempoDialProps> = ({
  value,
  onChange,
  min = 20,
  max = 400,
  step = 1,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const startAngleRef = useRef(0);
  const startValueRef = useRef(0);

  // Convert value to angle (270 degree range, -135 to +135)
  const valueToAngle = (val: number): number => {
    const normalized = (val - min) / (max - min);
    return normalized * 270 - 135;
  };

  // Convert angle to value
  const angleToValue = (angle: number): number => {
    // Normalize angle to 0-270 range
    const normalized = (angle + 135) / 270;
    const val = normalized * (max - min) + min;
    return Math.round(val / step) * step;
  };

  // Get angle from mouse position relative to dial center
  const getAngleFromEvent = (e: MouseEvent | React.MouseEvent): number => {
    if (!dialRef.current) return 0;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (angle < -180) angle += 360;

    return angle;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startAngleRef.current = getAngleFromEvent(e);
    startValueRef.current = value;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const currentAngle = getAngleFromEvent(e);
      let angleDelta = currentAngle - startAngleRef.current;

      // Handle angle wrapping
      if (angleDelta > 180) angleDelta -= 360;
      if (angleDelta < -180) angleDelta += 360;

      const startAngle = valueToAngle(startValueRef.current);
      let newAngle = startAngle + angleDelta;

      // Clamp to valid range
      newAngle = Math.max(-135, Math.min(135, newAngle));

      const newValue = angleToValue(newAngle);
      if (newValue !== value && newValue >= min && newValue <= max) {
        onChange(newValue);
      }
    },
    [isDragging, value, onChange, min, max]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const rotation = valueToAngle(value);

  // Handle keyboard input for fine control
  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newValue = value;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        newValue = Math.max(min, value - step);
        break;
      case 'PageUp':
        newValue = Math.min(max, value + 10 * step);
        break;
      case 'PageDown':
        newValue = Math.max(min, value - 10 * step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div className="tempo-dial-container">
      <div
        ref={dialRef}
        className={`tempo-dial ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Tempo"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div className="tempo-dial-track">
          {/* Tick marks */}
          {Array.from({ length: 19 }, (_, i) => {
            const angle = (i - 9) * 30;
            const isMain = i % 3 === 0;
            return (
              <div
                key={i}
                className={`tempo-dial-tick ${isMain ? 'main' : ''}`}
                style={{ transform: `rotate(${angle}deg)` }}
              />
            );
          })}
        </div>

        <div
          className="tempo-dial-knob"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="tempo-dial-pointer" />
        </div>

        <div className="tempo-dial-value">
          <span className="tempo-dial-number">{value}</span>
          <span className="tempo-dial-unit">BPM</span>
        </div>
      </div>

      <input
        type="number"
        className="tempo-dial-input"
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            onChange(newValue);
          }
        }}
        min={min}
        max={max}
        step={step}
        aria-label="Tempo input"
      />
    </div>
  );
};
