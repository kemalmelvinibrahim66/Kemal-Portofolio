import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';

describe('App full interactive portfolio integration', () => {
  it('renders Parallax intro, Spotlight portrait, 3D Glass Folders, Letter Portal, Tabbed Showcase, and 3D Activity Gallery', () => {
    render(<App />);

    // 1. Parallax & Grounded Hero
    expect(screen.getByText('WELCOME TO MY PORTOFOLIO')).toBeTruthy();
    expect(screen.getByText(/Membangun solusi/i)).toBeTruthy();

    // 2. Spotlight Portrait & 3D Glass Folders
    expect(screen.getByTestId('spotlight-portrait')).toBeTruthy();
    expect(screen.getByTestId('glass-folder-projects')).toBeTruthy();
    expect(screen.getByTestId('glass-folder-certificates')).toBeTruthy();

    // 3. Projects Tab (Screenshots for Asterisk & BeasiswaKu + Code Terminal for SQL Parser)
    expect(
      screen.getByText(/Asterisk: Bot WhatsApp Jadwal Kuliah/i)
    ).toBeTruthy();
    expect(screen.getByText(/Aplikasi Desktop BeasiswaKu/i)).toBeTruthy();
    expect(screen.getByText('test_sql_parser.py')).toBeTruthy();

    // 4. Switch to Certificates Tab in Showcase
    const certTab = screen.getByRole('tab', { name: /Sertifikat/i });
    fireEvent.click(certTab);
    expect(
      screen.getAllByText(/Belajar Machine Learning untuk Pemula/i).length
    ).toBeGreaterThan(0);

    // 5. Campus Activity Gallery
    expect(screen.getByText(/Keluarga Mahasiswa HIMAKOM Polban/i)).toBeTruthy();

    // 6. Bilingual Switch to EN
    const enBtn = screen.getByRole('button', { name: /^EN$/i });
    fireEvent.click(enBtn);
    expect(screen.getByText(/Building practical/i)).toBeTruthy();
    expect(
      screen.getByText(/HIMAKOM Polban Student Community/i)
    ).toBeTruthy();
  });
});
