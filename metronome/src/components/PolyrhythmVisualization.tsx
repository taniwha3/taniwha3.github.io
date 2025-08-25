import { useEffect, useRef, memo, useState } from 'react';
import type { PolyrhythmLayer } from '../types/polyrhythm';
import './PolyrhythmVisualization.css';

interface PolyrhythmVisualizationProps {
  layers: PolyrhythmLayer[];
  baseBeats: number;
  currentBeats?: { [layerId: string]: number };
}

function PolyrhythmVisualizationComponent({
  layers,
  baseBeats,
  currentBeats = {},
}: PolyrhythmVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 200 });
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width || 600,
          height: Math.max(200, layers.length * 60 + 40) // Dynamic height based on layers
        });
      }
    };

    // Initial size
    handleResize();

    // Create ResizeObserver for container
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize for DPR changes
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [layers.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    const padding = 20;
    const trackHeight = 40;
    const trackSpacing = 10;
    const width = dimensions.width - padding * 2;

    // Draw base beat grid
    ctx.strokeStyle = '#2a3439';
    ctx.lineWidth = 1;

    for (let i = 0; i <= baseBeats; i++) {
      const x = padding + (i * width) / baseBeats;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, dimensions.height - padding);
      ctx.stroke();
    }

    // Draw each layer
    layers.forEach((layer, layerIndex) => {
      if (layer.muted) return;

      const y =
        padding + layerIndex * (trackHeight + trackSpacing) + trackHeight / 2;

      // Draw track background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(padding, y - trackHeight / 2, width, trackHeight);

      // Draw subdivision grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= layer.subdivision; i++) {
        const x = padding + (i * width) / layer.subdivision;
        ctx.beginPath();
        ctx.moveTo(x, y - trackHeight / 2);
        ctx.lineTo(x, y + trackHeight / 2);
        ctx.stroke();
      }

      // Draw subdivision markers
      for (let i = 0; i < layer.subdivision; i++) {
        const subdivisionWidth = width / layer.subdivision;
        const baseX = padding + (i * width) / layer.subdivision;
        const x =
          (layer.alignment || 'edge') === 'center'
            ? baseX + subdivisionWidth / 2
            : baseX;

        if (layer.pattern[i]) {
          // Draw active beat
          const velocity = layer.velocities[i];
          const isCurrentBeat = currentBeats[layer.id] === i;
          const radius = isCurrentBeat ? 18 : 5 + velocity * 8;

          ctx.fillStyle = layer.color;
          ctx.globalAlpha = isCurrentBeat ? 1 : 0.3 + velocity * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Draw beat number
          ctx.globalAlpha = 1;
          ctx.fillStyle = isCurrentBeat ? '#ffd700' : '#e0e0e0';
          ctx.font = isCurrentBeat ? 'bold 12px Space Mono' : '10px Space Mono';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${i + 1}`, x, y);
        } else {
          // Draw inactive beat marker
          ctx.fillStyle = '#3a4449';
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw layer label
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#999';
      ctx.font = '12px Space Mono';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${layer.subdivision}:${baseBeats}`, padding - 5, y);
    });
  }, [layers, baseBeats, currentBeats, dimensions]);

  return (
    <div className="polyrhythm-visualization" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="visualization-canvas"
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: dimensions.width, height: dimensions.height }}
      />
      <div className="visualization-legend">
        <p>Each row shows how beats align within one bar</p>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const PolyrhythmVisualization = memo(PolyrhythmVisualizationComponent);
