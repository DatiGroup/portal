import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { store } from 'store/store';
import ThemeCustomization from 'themes';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const AllTheProviders = ({ children }: Props) => {
  return (
    <MemoryRouter>
      <ThemeCustomization>
        <Provider store={store}>{children}</Provider>
      </ThemeCustomization>
    </MemoryRouter>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
