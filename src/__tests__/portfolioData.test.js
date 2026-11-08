import { describe, it, expect } from 'vitest';
import { portfolioData } from '../data/portfolioData';

describe('portfolioData structure and constraints', () => {
  it('provides both Indonesian (id) and English (en) locales', () => {
    expect(portfolioData).toHaveProperty('id');
    expect(portfolioData).toHaveProperty('en');
    expect(portfolioData).toHaveProperty('profile');
  });

  it('contains zero em-dash or en-dash characters across the entire dataset', () => {
    const serialized = JSON.stringify(portfolioData);
    expect(serialized).not.toMatch(/[\u2013\u2014]/);
  });

  it('keeps copywriting grounded and humble without exaggerated titles', () => {
    const serialized = JSON.stringify(portfolioData).toLowerCase();
    expect(serialized).not.toContain('senior python');
    expect(serialized).not.toContain('expert');
    expect(serialized).not.toContain('10x');
  });

  it('includes all 4 real projects with screenshots for p1/p2 and codePreview for p3/p4', () => {
    ['id', 'en'].forEach((locale) => {
      const projects = portfolioData[locale].projects;
      expect(projects).toHaveLength(4);
      expect(projects[0].image).toBe('/assets/asterisk-dashboard.png');
      expect(projects[0].secondaryImage).toBe('/assets/asterisk-login.png');
      expect(projects[1].image).toBe('/assets/beasiswaku-dashboard.png');
      expect(projects[2].image).toBeNull();
      expect(projects[2].codePreview).toBeTruthy();
      expect(projects[3].image).toBeNull();
      expect(projects[3].codePreview).toBeTruthy();
    });
  });

  it('includes real certificate and award images plus 3 campus activity photos', () => {
    ['id', 'en'].forEach((locale) => {
      const { journey, activities } = portfolioData[locale];
      expect(journey.award.image).toBe('/assets/cert-pekan-it-2026.png');
      expect(journey.certificates[0].image).toBe('/assets/cert-dicoding-ml.png');
      expect(journey.certificates[1].image).toBe('/assets/cert-dicoding-python.png');
      expect(activities).toHaveLength(3);
      expect(activities[0].image).toBe('/assets/activity-himakom-1.jpeg');
      expect(activities[1].image).toBe('/assets/activity-mpa-2.jpeg');
      expect(activities[2].image).toBe('/assets/activity-himakom-3.jpeg');
    });
  });
});
