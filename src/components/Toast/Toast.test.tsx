import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import Toast from './Toast';

describe('Toast', () => {
  it('renders success toast with message', () => {
    const onClose = vi.fn();
    render(<Toast message="Test success message" type="success" onClose={onClose} />);

    expect(screen.getByText('Test success message')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders error toast with message', () => {
    const onClose = vi.fn();
    render(<Toast message="Test error message" type="error" onClose={onClose} />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('!')).toBeInTheDocument();
  });

  it('calls onClose after timeout', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Test message" type="success" onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('defaults to success type if not specified', () => {
    const onClose = vi.fn();
    render(<Toast message="Test message" onClose={onClose} />);

    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});