import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Full App integration and review focus checks', () => {
  it('renders ID by default, switches all sections to EN, displays all 4 contact cards with SVGs, and has zero em/en dashes in DOM', () => {
    const { container } = render(<App />);
    expect(screen.getByText('Tentang Saya')).toBeTruthy();
    expect(screen.getByText('kemal.melvin.tif425@polban.ac.id').className).toContain('break-all');
    expect(screen.getByText('@melviinn_k')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByText('About Me')).toBeTruthy();
    expect(screen.getByText('Selected Projects')).toBeTruthy();

    const contactSection = container.querySelector('#contact');
    expect(contactSection.querySelectorAll('svg').length).toBeGreaterThanOrEqual(4);
    expect(container.textContent).not.toMatch(/[\u2013\u2014]/);
  });
});
