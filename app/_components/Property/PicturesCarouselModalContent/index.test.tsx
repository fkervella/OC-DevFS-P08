// PicturesCarouselModalContent.test.tsx
import { act,fireEvent, render, screen } from '@testing-library/react';
import { afterEach,beforeEach, describe, expect, it, vi } from 'vitest';

import PicturesCarouselModalContent from './index';

// Mock next/image pour éviter les erreurs dans l'environnement de test
vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

const mockProperty = {
  id: '1',
  slug: 'test-property',
  title: 'Test Property',
  description: 'Description test',
  cover: '/cover.jpg',
  location: 'Paris',
  price_per_night: 100,
  rating_avg: 4.5,
  ratings_count: 10,
  pictures: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg'],
  equipments: [],
  tags: [],
  host: { id: 1, name: 'Host', picture: '/host.jpg' },
};

const mockPropertyOnePicture = {
  id: '1',
  slug: 'test-property',
  title: 'Test Property',
  description: 'Description test',
  cover: '/cover.jpg',
  location: 'Paris',
  price_per_night: 100,
  rating_avg: 4.5,
  ratings_count: 10,
  pictures: ['/img1.jpg'],
  equipments: [],
  tags: [],
  host: { id: 1, name: 'Host', picture: '/host.jpg' },
};

const onSubmitSuccess = vi.fn();

describe('PicturesCarouselModalContent', () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // ─── Rendu initial ───────────────────────────────────────────────────────────

  it('affiche la première image au chargement', () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);
    // La miniature de l'image 1 a la bordure rouge
    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails[2]).not.toBeNull(); // boutons prev + next + miniatures
  });

  it('affiche toutes les miniatures', () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);
    mockProperty.pictures.forEach((_, index) => {
      expect(screen.getByAltText(`Image secondaire ${index + 1} de Test Property`)).toBeDefined();
    });
  });

  it('la miniature de l\'image active a la bordure rouge', () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);
    const activeThumbnail = screen.getByAltText('Image secondaire 1 de Test Property');
    expect(activeThumbnail.className).toContain('border-mainRed');
  });

  // ─── Navigation par miniatures ───────────────────────────────────────────────

  it('clique sur une miniature : met à jour la miniature active après la transition', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    const thumbnail3 = screen.getByAltText('Image secondaire 3 de Test Property');
    fireEvent.click(thumbnail3.closest('button')!);

    await act(async () => { vi.advanceTimersByTime(350); });

    const updatedThumbnail = screen.getByAltText('Image secondaire 3 de Test Property');
    expect(updatedThumbnail.className).toContain('border-mainRed');
  });

  it('clique sur la miniature déjà active : ne déclenche pas de transition', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    const thumbnail1 = screen.getByAltText('Image secondaire 1 de Test Property');
    fireEvent.click(thumbnail1.closest('button')!);

    await act(async () => { vi.advanceTimersByTime(350); });

    // L'image 1 est toujours active
    expect(thumbnail1.className).toContain('border-mainRed');
  });

  it('clique sur miniature non adjacente : la bonne image devient active', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    // Saut de img1 → img4
    const thumbnail4 = screen.getByAltText('Image secondaire 4 de Test Property');
    fireEvent.click(thumbnail4.closest('button')!);

    await act(async () => { vi.advanceTimersByTime(350); });

    expect(thumbnail4.className).toContain('border-mainRed');
    // img1 n'est plus active
    const thumbnail1 = screen.getByAltText('Image secondaire 1 de Test Property');
    expect(thumbnail1.className).not.toContain('border-mainRed');
  });

  // ─── Navigation par boutons ──────────────────────────────────────────────────

  it('pas de bouton précédent/suivant si une seule image ', async () => {
    render(<PicturesCarouselModalContent property={mockPropertyOnePicture} onSubmitSuccess={onSubmitSuccess} />);

    expect(screen.queryByRole('button', { name: 'Image précédente' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Image suivante' })).not.toBeInTheDocument();
  });

  it("boutons précédent/suivant présents si plus qu'une image ", async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    expect(screen.getByRole('button', { name: 'Image précédente' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Image suivante' })).toBeInTheDocument();
  });


  it('bouton suivant : passe à l\'image 2', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    fireEvent.click(screen.getByLabelText('Image suivante'));
    await act(async () => { vi.advanceTimersByTime(350); });

    const thumbnail2 = screen.getByAltText('Image secondaire 2 de Test Property');
    expect(thumbnail2.className).toContain('border-mainRed');
  });

  it('bouton précédent : boucle vers la dernière image depuis la première', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    fireEvent.click(screen.getByLabelText('Image précédente'));
    await act(async () => { vi.advanceTimersByTime(350); });

    const lastThumbnail = screen.getByAltText(`Image secondaire ${mockProperty.pictures.length} de Test Property`);
    expect(lastThumbnail.className).toContain('border-mainRed');
  });

  it('bouton suivant depuis la dernière image : boucle vers la première', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    // Aller à la dernière image
    const lastThumbnail = screen.getByAltText(`Image secondaire ${mockProperty.pictures.length} de Test Property`);
    fireEvent.click(lastThumbnail.closest('button')!);
    await act(async () => { vi.advanceTimersByTime(350); });

    // Cliquer sur suivant
    fireEvent.click(screen.getByLabelText('Image suivante'));
    await act(async () => { vi.advanceTimersByTime(350); });

    const firstThumbnail = screen.getByAltText('Image secondaire 1 de Test Property');
    expect(firstThumbnail.className).toContain('border-mainRed');
  });

  it('les boutons sont désactivés pendant la transition', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    fireEvent.click(screen.getByLabelText('Image suivante'));

    // Pendant la transition
    expect(screen.getByLabelText('Image suivante')).toBeDisabled();
    expect(screen.getByLabelText('Image précédente')).toBeDisabled();

    await act(async () => { vi.advanceTimersByTime(350); });

    // Après la transition
    expect(screen.getByLabelText('Image suivante')).not.toBeDisabled();
    expect(screen.getByLabelText('Image précédente')).not.toBeDisabled();
  });

  // ─── Navigation au clavier ───────────────────────────────────────────────────

  it('touche ArrowRight : passe à l\'image suivante', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    await act(async () => { vi.advanceTimersByTime(350); });

    const thumbnail2 = screen.getByAltText('Image secondaire 2 de Test Property');
    expect(thumbnail2.className).toContain('border-mainRed');
  });

  it('touche ArrowLeft : passe à l\'image précédente', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    // Aller à l'image 2 d'abord
    fireEvent.click(screen.getByAltText('Image secondaire 2 de Test Property').closest('button')!);
    await act(async () => { vi.advanceTimersByTime(350); });

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    await act(async () => { vi.advanceTimersByTime(350); });

    const thumbnail1 = screen.getByAltText('Image secondaire 1 de Test Property');
    expect(thumbnail1.className).toContain('border-mainRed');
  });

  it('autres touches clavier : n\'ont aucun effet', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    fireEvent.keyDown(document, { key: 'Enter' });
    await act(async () => { vi.advanceTimersByTime(350); });

    const thumbnail1 = screen.getByAltText('Image secondaire 1 de Test Property');
    expect(thumbnail1.className).toContain('border-mainRed');
  });

  // ─── Cas limites ─────────────────────────────────────────────────────────────

  it('ne démarre pas une transition si une est déjà en cours', async () => {
    render(<PicturesCarouselModalContent property={mockProperty} onSubmitSuccess={onSubmitSuccess} />);

    fireEvent.click(screen.getByLabelText('Image suivante'));
    // Clic pendant la transition — doit être ignoré
    fireEvent.click(screen.getByLabelText('Image suivante'));

    await act(async () => { vi.advanceTimersByTime(350); });

    // On doit être sur l'image 2, pas l'image 3
    const thumbnail2 = screen.getByAltText('Image secondaire 2 de Test Property');
    expect(thumbnail2.className).toContain('border-mainRed');
  });
});