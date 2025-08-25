import { useEffect, useRef } from 'react';
import type { Bar } from './Timeline';
import './TempoCurve.css';

interface TempoCurveProps {
  bars: Bar[];
  selectedBarId: string | null;
}

export function TempoCurve({ bars, selectedBarId }: TempoCurveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Calculate dimensions
    const padding = 20;
    const graphWidth = rect.width - padding * 2;
    const graphHeight = rect.height - padding * 2;

    // Find min/max tempo for scaling
    const tempos = bars.map((bar) => bar.tempo);
    const minTempo = Math.min(...tempos) - 10;
    const maxTempo = Math.max(...tempos) + 10;
    const tempoRange = maxTempo - minTempo;

    // Draw grid
    ctx.strokeStyle = '#2a3439';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * graphHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();

      // Tempo labels
      const tempo = Math.round(maxTempo - (i * tempoRange) / 5);
      ctx.fillStyle = '#666';
      ctx.font = '10px Space Mono';
      ctx.textAlign = 'right';
      ctx.fillText(`${tempo}`, padding - 5, y + 3);
    }

    // Draw tempo curve
    if (bars.length > 0) {
      const barWidth = graphWidth / bars.length;

      // Create points for the curve
      const points = bars.map((bar, index) => ({
        x: padding + (index + 0.5) * barWidth,
        y:
          padding +
          graphHeight -
          ((bar.tempo - minTempo) / tempoRange) * graphHeight,
        tempo: bar.tempo,
        id: bar.id,
      }));

      // Draw curve using bezier curves
      ctx.strokeStyle = '#ff6666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const cp1x = points[i].x + barWidth * 0.5;
        const cp1y = points[i].y;
        const cp2x = points[i + 1].x - barWidth * 0.5;
        const cp2y = points[i + 1].y;

        ctx.bezierCurveTo(
          cp1x,
          cp1y,
          cp2x,
          cp2y,
          points[i + 1].x,
          points[i + 1].y
        );
      }
      ctx.stroke();

      // Draw points
      points.forEach((point, index) => {
        const bar = bars[index];
        const isSelected = bar.id === selectedBarId;

        ctx.fillStyle = isSelected ? '#ffd700' : '#ff3333';
        ctx.beginPath();
        ctx.arc(point.x, point.y, isSelected ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();

        // Bar labels
        ctx.fillStyle = '#999';
        ctx.font = '10px Space Mono';
        ctx.textAlign = 'center';
        ctx.fillText(`${index + 1}`, point.x, rect.height - 5);
      });

      // Draw control points for selected bar
      if (selectedBarId && bars.length > 1) {
        const selectedIndex = bars.findIndex((bar) => bar.id === selectedBarId);
        if (selectedIndex >= 0) {
          const point = points[selectedIndex];

          // Draw control handles
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);

          if (selectedIndex > 0) {
            const prevPoint = points[selectedIndex - 1];
            const cp1x = prevPoint.x + barWidth * 0.5;
            const cp1y = prevPoint.y;

            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(cp1x, cp1y);
            ctx.stroke();

            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(cp1x, cp1y, 3, 0, Math.PI * 2);
            ctx.fill();
          }

          if (selectedIndex < bars.length - 1) {
            const cp2x = point.x + barWidth * 0.5;
            const cp2y = point.y;

            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(cp2x, cp2y);
            ctx.stroke();

            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(cp2x, cp2y, 3, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.setLineDash([]);
        }
      }
    }
  }, [bars, selectedBarId]);

  return (
    <div className="tempo-curve-container">
      <h4>Tempo Curve</h4>
      <canvas ref={canvasRef} className="tempo-curve-canvas" />
    </div>
  );
}
