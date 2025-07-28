import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('renders the welcome heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js 14\+ template/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the Get Started button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the Learn More button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /learn more/i });
    expect(button).toBeInTheDocument();
  });
});