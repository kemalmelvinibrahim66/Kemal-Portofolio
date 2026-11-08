import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { portfolioData } from '../data/portfolioData';

describe('Navbar and Hero components', () => {
  it('renders Floating Pill Navbar with companion mascot and switches language', () => {
    const onSelectLang = vi.fn();
    const onSelectSection = vi.fn();
    render(
      <Navbar
        lang="id"
        onSelectLang={onSelectLang}
        copy={portfolioData.id.nav}
        activeSection="home"
        onSelectSection={onSelectSection}
      />
    );

    expect(screen.getByTestId('nav-mascot')).toBeTruthy();
    expect(screen.getByText('karya')).toBeTruthy();
    expect(screen.getByText('tentang')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /EN/i }));
    expect(onSelectLang).toHaveBeenCalledWith('en');
  });

  it('renders 5-layer Parallax welcome banner and grounded student Hero without badge below portrait', () => {
    render(<Hero copy={portfolioData.id.hero} profile={portfolioData.profile} />);

    expect(screen.getByText('WELCOME TO MY PORTOFOLIO')).toBeTruthy();
    expect(screen.getByText(/Belajar merancang/i)).toBeTruthy();
    expect(screen.getByText(/tampilan web rapi/i)).toBeTruthy();

    const portrait = screen.getByAltText(portfolioData.profile.name);
    expect(portrait.getAttribute('src')).toBe('/assets/profile_0.png');
  });
});
