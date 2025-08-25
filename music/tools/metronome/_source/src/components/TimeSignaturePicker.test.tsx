import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { TimeSignaturePicker } from './TimeSignaturePicker';

describe('TimeSignaturePicker', () => {
  it('renders with initial values', () => {
    const onNumeratorChange = vi.fn();
    const onDenominatorChange = vi.fn();

    render(
      <TimeSignaturePicker
        numerator={4}
        denominator={4}
        onNumeratorChange={onNumeratorChange}
        onDenominatorChange={onDenominatorChange}
      />
    );

    const numeratorSelect = screen.getByLabelText('Beats per measure');
    const denominatorSelect = screen.getByLabelText('Beat note value');

    expect(numeratorSelect).toHaveValue('4');
    expect(denominatorSelect).toHaveValue('4');
    expect(screen.getByText(/Common Time/)).toBeInTheDocument();
  });

  it('calls onNumeratorChange when numerator is changed', () => {
    const onNumeratorChange = vi.fn();
    const onDenominatorChange = vi.fn();

    render(
      <TimeSignaturePicker
        numerator={4}
        denominator={4}
        onNumeratorChange={onNumeratorChange}
        onDenominatorChange={onDenominatorChange}
      />
    );

    const numeratorSelect = screen.getByLabelText('Beats per measure');
    fireEvent.change(numeratorSelect, { target: { value: '7' } });

    expect(onNumeratorChange).toHaveBeenCalledWith(7);
  });

  it('calls onDenominatorChange when denominator is changed', () => {
    const onNumeratorChange = vi.fn();
    const onDenominatorChange = vi.fn();

    render(
      <TimeSignaturePicker
        numerator={4}
        denominator={4}
        onNumeratorChange={onNumeratorChange}
        onDenominatorChange={onDenominatorChange}
      />
    );

    const denominatorSelect = screen.getByLabelText('Beat note value');
    fireEvent.change(denominatorSelect, { target: { value: '8' } });

    expect(onDenominatorChange).toHaveBeenCalledWith(8);
  });

  it('displays correct description for common time signatures', () => {
    const onNumeratorChange = vi.fn();
    const onDenominatorChange = vi.fn();

    const { rerender } = render(
      <TimeSignaturePicker
        numerator={3}
        denominator={4}
        onNumeratorChange={onNumeratorChange}
        onDenominatorChange={onDenominatorChange}
      />
    );

    expect(screen.getByText(/Waltz Time/)).toBeInTheDocument();

    rerender(
      <TimeSignaturePicker
        numerator={6}
        denominator={8}
        onNumeratorChange={onNumeratorChange}
        onDenominatorChange={onDenominatorChange}
      />
    );

    expect(screen.getByText(/Compound Duple/)).toBeInTheDocument();
  });

  it('displays generic description for uncommon time signatures', () => {
    const onNumeratorChange = vi.fn();
    const onDenominatorChange = vi.fn();

    render(
      <TimeSignaturePicker
        numerator={11}
        denominator={16}
        onNumeratorChange={onNumeratorChange}
        onDenominatorChange={onDenominatorChange}
      />
    );

    expect(
      screen.getByText('11 sixteenth notes per measure')
    ).toBeInTheDocument();
  });

  it('has proper ARIA labels', () => {
    const onNumeratorChange = vi.fn();
    const onDenominatorChange = vi.fn();

    render(
      <TimeSignaturePicker
        numerator={4}
        denominator={4}
        onNumeratorChange={onNumeratorChange}
        onDenominatorChange={onDenominatorChange}
      />
    );

    expect(screen.getByLabelText('Beats per measure')).toBeInTheDocument();
    expect(screen.getByLabelText('Beat note value')).toBeInTheDocument();
  });
});
