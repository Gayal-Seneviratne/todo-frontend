import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import CreateTodo from './CreateTodo';

describe('CreateTodo', () => {
  it('renders the form inputs and button', () => {
    const mockProps = {
      title: '',
      description: '',
      setTitle: vi.fn(),
      setDescription: vi.fn(),
      onSubmit: vi.fn(),
    };

    render(<CreateTodo {...mockProps} />);

    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted with title', () => {
    const mockProps = {
      title: 'Test Todo',
      description: 'Test Description',
      setTitle: vi.fn(),
      setDescription: vi.fn(),
      onSubmit: vi.fn(),
    };

    render(<CreateTodo {...mockProps} />);
    
    const submitButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(submitButton);

    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('updates title and description when typing', () => {
    const mockProps = {
      title: '',
      description: '',
      setTitle: vi.fn(),
      setDescription: vi.fn(),
      onSubmit: vi.fn(),
    };

    render(<CreateTodo {...mockProps} />);
    
    const titleInput = screen.getByPlaceholderText(/title/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });

    expect(mockProps.setTitle).toHaveBeenCalledWith('New Title');
    expect(mockProps.setDescription).toHaveBeenCalledWith('New Description');
  });
});