import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TechStackBar } from '../components/TechStackBar';
import { portfolioData } from '../data/portfolioData';

describe('Navbar, Hero, and TechStackBar', () => {
  it('switches language when EN button is clicked and renders Hero without finalist badge under photo', () => {
    const onSelectLang = vi.fn();
    render(
      <>
        <Navbar lang="id" onSelectLang={onSelectLang} copy={portfolioData.id.nav} />
        <Hero copy={portfolioData.id.hero} profile={portfolioData.profile} />
        <TechStackBar />
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(onSelectLang).toHaveBeenCalledWith('en');
    expect(screen.getByAltText('Kemal Melvin Ibrahim')).toBeTruthy();
    expect(screen.queryByText(/PEKAN IT/i)).toBeNull();
    expect(screen.getByText('Tailwind CSS')).toBeTruthy();
  });
});
