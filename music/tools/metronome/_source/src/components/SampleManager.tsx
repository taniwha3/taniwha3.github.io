import './SampleManager.css';

export function SampleManager() {
  return (
    <div className="sample-manager">
      <h3>Sample Manager</h3>

      <div className="sample-section">
        <h4>Default Samples</h4>
        <div className="sample-list">
          <div className="sample-item">
            <span className="sample-name">Click (Default)</span>
            <button className="play-sample-button">▶</button>
          </div>
          <div className="sample-item">
            <span className="sample-name">Woodblock</span>
            <button className="play-sample-button">▶</button>
          </div>
          <div className="sample-item">
            <span className="sample-name">Cowbell</span>
            <button className="play-sample-button">▶</button>
          </div>
        </div>
      </div>

      <div className="sample-section">
        <h4>Custom Samples</h4>
        <div className="upload-area">
          <p>Drag & drop audio files here or click to upload</p>
          <p className="upload-info">Supports: WAV, MP3, OGG (max 5MB)</p>
        </div>
      </div>

      <div className="sample-settings">
        <h4>Click Settings</h4>
        <div className="setting-item">
          <label>Main Click:</label>
          <select>
            <option>Click (Default)</option>
            <option>Woodblock</option>
            <option>Cowbell</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Accent Click:</label>
          <select>
            <option>Click (Default)</option>
            <option>Woodblock</option>
            <option>Cowbell</option>
          </select>
        </div>
      </div>
    </div>
  );
}
