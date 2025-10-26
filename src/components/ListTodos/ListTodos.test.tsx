import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import ListTodos from './ListTodos';
import type { Task } from '../../services/api';

describe('ListTodos', () => {
  const mockTasks: Task[] = [
    { 
      id: '1',
      title: 'Test Task 1',
      description: 'Description 1',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    { 
      id: '2',
      title: 'Test Task 2',
      description: 'Description 2',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
  ];

  it('renders loading state', () => {
    render(<ListTodos tasks={[]} loading={true} error={null} onDone={vi.fn()} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Failed to load tasks';
    render(<ListTodos tasks={[]} loading={false} error={errorMessage} onDone={vi.fn()} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders task list', () => {
    render(<ListTodos tasks={mockTasks} loading={false} error={null} onDone={vi.fn()} />);
    expect(screen.getByText(mockTasks[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockTasks[1].title)).toBeInTheDocument();
  });

  it('calls onDone when done button is clicked', () => {
    const onDone = vi.fn();
    render(<ListTodos tasks={mockTasks} loading={false} error={null} onDone={onDone} />);
    
    const doneButtons = screen.getAllByRole('button', { name: /done/i });
    fireEvent.click(doneButtons[0]);

    expect(onDone).toHaveBeenCalledWith(mockTasks[0].id);
  });

  it('renders empty state when no tasks', () => {
    render(<ListTodos tasks={[]} loading={false} error={null} onDone={vi.fn()} />);
    expect(screen.getByText(/no pending tasks/i)).toBeInTheDocument();
  });
});