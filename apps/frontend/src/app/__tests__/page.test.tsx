import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

describe('Home Page', () => {
  it('renders the main heading', async () => {
    await act(async () => {
      render(<Home />);
    });

    const heading = screen.getByRole('heading', {
      name: /next\.js typescript template/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the theme toggle button', async () => {
    await act(async () => {
      render(<Home />);
    });

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the navigation links', async () => {
    await act(async () => {
      render(<Home />);
    });

    const homeLink = screen.getByRole('link', { name: /home/i });
    const featuresLink = screen.getByRole('link', { name: /features/i });
    const docsLink = screen.getByRole('link', { name: /documentation/i });

    expect(homeLink).toBeInTheDocument();
    expect(featuresLink).toBeInTheDocument();
    expect(docsLink).toBeInTheDocument();
  });
});
