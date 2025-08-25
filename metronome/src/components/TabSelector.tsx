import React from 'react';
import './TabSelector.css';

export type TabType = 'metronome' | 'fretboard' | 'harmonics' | 'pentatonics' | 'circle';

interface TabSelectorProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  activeTab,
  onChange,
}) => {
  return (
    <div className="tab-selector" role="tablist">
      <button
        className={`tab-button ${activeTab === 'metronome' ? 'active' : ''}`}
        onClick={() => onChange('metronome')}
        role="tab"
        aria-selected={activeTab === 'metronome'}
        aria-label="Metronome tab"
      >
        Metronome
      </button>
      <button
        className={`tab-button ${activeTab === 'fretboard' ? 'active' : ''}`}
        onClick={() => onChange('fretboard')}
        role="tab"
        aria-selected={activeTab === 'fretboard'}
        aria-label="Fretboard tab"
      >
        Fretboard
      </button>
      <button
        className={`tab-button ${activeTab === 'harmonics' ? 'active' : ''}`}
        onClick={() => onChange('harmonics')}
        role="tab"
        aria-selected={activeTab === 'harmonics'}
        aria-label="Natural Harmonics tab"
      >
        Harmonics
      </button>
      <button
        className={`tab-button ${activeTab === 'pentatonics' ? 'active' : ''}`}
        onClick={() => onChange('pentatonics')}
        role="tab"
        aria-selected={activeTab === 'pentatonics'}
        aria-label="Pentatonics tab"
      >
        Pentatonics
      </button>
      <button
        className={`tab-button ${activeTab === 'circle' ? 'active' : ''}`}
        onClick={() => onChange('circle')}
        role="tab"
        aria-selected={activeTab === 'circle'}
        aria-label="Circle of Fifths tab"
      >
        Circle of 5ths
      </button>
    </div>
  );
};
