import { describe, expect, it } from 'vitest';
import { publicPolicy } from '@/data/launch';
import { estates } from '@/data/estates';
import { publishedProperties } from '@/data/properties';
import { about } from '@/data/pages';
import { site } from '@/data/site';

describe('Public information exclusions', () => {
  it('disables financial figures across public views', () => {
    expect(publicPolicy.showFinancialFigures).toBe(false);
  });

  it('disables internal document links', () => {
    expect(publicPolicy.showInternalDocuments).toBe(false);
  });
});

describe('No placeholder text in public data', () => {
  it('site has a real WhatsApp number', () => {
    expect(site.whatsapp).toBe('2348022224248');
  });

  it('site has exactly 3 offices (Port Harcourt removed)', () => {
    expect(site.offices).toHaveLength(3);
    const cities = site.offices.map((o) => o.city);
    expect(cities).not.toContain('Port Harcourt');
  });

  it('site socials only contains youtube, no placeholder facebook/instagram/x', () => {
    const socials = site.socials as Record<string, string>;
    expect(socials.youtube).toContain('youtube.com');
    expect(socials.facebook).toBeUndefined();
    expect(socials.instagram).toBeUndefined();
    expect(socials.x).toBeUndefined();
  });

  it('no office address contains PLACEHOLDER text', () => {
    for (const o of site.offices) {
      expect(o.address).not.toMatch(/PLACEHOLDER/i);
    }
  });

  it('plot status is unverified (neutral display mode)', () => {
    expect(estates[0].plotStatusVerified).toBe(false);
  });

  it('only published properties appear in the public listing', () => {
    for (const p of publishedProperties) {
      expect(p.published).toBe(true);
    }
  });

  it('no published property title contains PLACEHOLDER', () => {
    for (const p of publishedProperties) {
      expect(p.title).not.toMatch(/PLACEHOLDER/i);
    }
  });

  it('estate landmark distances do not contain PLACEHOLDER', () => {
    for (const estate of estates) {
      for (const l of estate.landmarks) {
        if (l.distance !== undefined) {
          expect(l.distance).not.toMatch(/PLACEHOLDER/i);
        }
      }
    }
  });

  it('leadership is hidden until leadershipVerified is true', () => {
    expect(about.leadershipVerified).toBe(false);
  });

  it('credentials are hidden until credentialsVerified is true', () => {
    expect(about.credentialsVerified).toBe(false);
  });
});
