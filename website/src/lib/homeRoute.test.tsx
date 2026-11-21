import { describe, it, expect } from 'vitest';
import { homeFor } from '../routes';
import { Press } from '../pages/Press';
import { Catalogue } from '../pages/Catalogue';

// aiepress.com serves press.html at "/". The browser's router must pick the
// same page there, or it hydrates book 1's homepage over the press markup.
describe('homeFor', () => {
  it('renders the press homepage on aiepress.com', () => {
    expect(homeFor('aiepress.com').type).toBe(Press);
  });

  it('renders book 1 everywhere else, including the build', () => {
    expect(homeFor('fromcopilottocolleague.com').type).toBe(Catalogue);
    expect(homeFor('localhost').type).toBe(Catalogue);
    expect(homeFor(undefined).type).toBe(Catalogue);
  });
});
