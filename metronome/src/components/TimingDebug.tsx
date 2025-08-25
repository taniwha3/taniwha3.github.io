import './TimingDebug.css';

interface TimingDebugProps {
  isVisible: boolean;
}

export function TimingDebug({ isVisible }: TimingDebugProps) {
  if (!isVisible) return null;

  return (
    <div className="timing-debug">
      <h4>Timing Debug</h4>
      <div className="debug-section">
        <p>PID controller has been removed.</p>
        <p>Web Audio API provides precise timing.</p>
      </div>
    </div>
  );
}
