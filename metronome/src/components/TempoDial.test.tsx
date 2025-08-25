import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { TempoDial } from './TempoDial';

describe('TempoDial', () => {
  it('renders with initial value', () => {
    const onChange = vi.fn();
    render(<TempoDial value={120} onChange={onChange} />);

    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('BPM')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    const onChange = vi.fn();
    render(<TempoDial value={120} onChange={onChange} />);

    const dial = screen.getByRole('slider');

    // Arrow up increases value
    fireEvent.keyDown(dial, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(121);

    // Arrow down decreases value
    fireEvent.keyDown(dial, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith(119);

    // Page up increases by 10
    fireEvent.keyDown(dial, { key: 'PageUp' });
    expect(onChange).toHaveBeenCalledWith(130);

    // Page down decreases by 10
    fireEvent.keyDown(dial, { key: 'PageDown' });
    expect(onChange).toHaveBeenCalledWith(110);
  });

  it('respects min and max bounds', () => {
    const onChange = vi.fn();
    render(<TempoDial value={20} onChange={onChange} min={20} max={400} />);

    const dial = screen.getByRole('slider');

    // Should not go below min
    fireEvent.keyDown(dial, { key: 'ArrowDown' });
    expect(onChange).not.toHaveBeenCalled();

    // Should be able to go up
    fireEvent.keyDown(dial, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(21);
  });

  it('handles number input', () => {
    const onChange = vi.fn();
    render(<TempoDial value={120} onChange={onChange} />);

    const input = screen.getByRole('spinbutton', { name: 'Tempo input' });

    fireEvent.change(input, { target: { value: '150' } });
    expect(onChange).toHaveBeenCalledWith(150);
  });

  it('ignores invalid number input', () => {
    const onChange = vi.fn();
    render(<TempoDial value={120} onChange={onChange} />);

    const input = screen.getByRole('spinbutton', { name: 'Tempo input' });

    // Invalid number
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(onChange).not.toHaveBeenCalled();

    // Out of range
    fireEvent.change(input, { target: { value: '500' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has proper ARIA attributes', () => {
    render(<TempoDial value={120} onChange={vi.fn()} min={20} max={400} />);

    const dial = screen.getByRole('slider');
    expect(dial).toHaveAttribute('aria-label', 'Tempo');
    expect(dial).toHaveAttribute('aria-valuemin', '20');
    expect(dial).toHaveAttribute('aria-valuemax', '400');
    expect(dial).toHaveAttribute('aria-valuenow', '120');
  });

  it('applies custom step', () => {
    const onChange = vi.fn();
    render(<TempoDial value={120} onChange={onChange} step={5} />);

    const dial = screen.getByRole('slider');

    fireEvent.keyDown(dial, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(125);
  });
});
