import { describe, it, expect } from 'vitest';
import { portfolioData } from '../data/portfolioData';

describe('portfolioData contract', () => {
  it('provides matching top-level keys for id and en locales and contains zero em/en dashes', () => {
    expect(Object.keys(portfolioData.id)).toEqual(Object.keys(portfolioData.en));
    const serialized = JSON.stringify(portfolioData);
    expect(serialized).not.toMatch(/[\u2013\u2014]/);
    expect(portfolioData.profile.instagram).toBe('https://www.instagram.com/melviinn_k');
    expect(portfolioData.profile.email).toBe('kemal.melvin.tif425@polban.ac.id');
    expect(portfolioData.id.projects).toHaveLength(4);
    expect(portfolioData.en.projects).toHaveLength(4);
  });
});
