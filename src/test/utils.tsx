import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';
import { ToastProvider } from '../components/Toast/ToastContext';

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ToastProvider>
        {children}
      </ToastProvider>
    ),
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };