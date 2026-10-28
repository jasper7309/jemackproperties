import { describe, expect, it } from 'vitest';
import { publicPolicy } from '@/data/launch';
import { estates } from '@/data/estates';
import { publishedProperties, properties, propertyStates } from '@/data/properties';
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

  it('site socials only contains youtube, facebook and instagram — no placeholder x/twitter', () => {
    const socials = site.socials as Record<string, string>;
    expect(socials.youtube).toContain('youtube.com');
    expect(socials.facebook).toContain('facebook.com');
    expect(socials.instagram).toContain('instagram.com');
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

describe('Property listings — 10 published listings', () => {
  it('has exactly 10 published listings', () => {
    expect(publishedProperties).toHaveLength(10);
  });

  it('no property data file contains a ₦ character', () => {
    for (const p of properties) {
      // Check all string fields
      const fields = [
        p.title,
        p.description,
        p.location,
        p.state,
        p.size,
        p.paymentSummary ?? '',
        p.note ?? '',
        p.titleStatus ?? '',
        ...(p.features ?? []),
        ...(p.landmarks ?? []),
        ...(p.sizes ?? []),
      ];
      for (const f of fields) {
        expect(f).not.toContain('₦');
      }
    }
  });

  it('no property has a defined price value', () => {
    for (const p of properties) {
      expect(p.price).toBeUndefined();
    }
  });

  it('Oliveness price is undefined', () => {
    const oliveness = properties.find((p) => p.slug === 'oliveness-garden-estate');
    expect(oliveness?.price).toBeUndefined();
  });

  it('all 10 published listings have a slug, title and developer', () => {
    for (const p of publishedProperties) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.developer).toBeTruthy();
    }
  });

  it('Oliveness shows as "Jemack Properties" developer and listingType "own"', () => {
    const oliveness = publishedProperties.find((p) => p.slug === 'oliveness-garden-estate');
    expect(oliveness?.developer).toBe('Jemack Properties');
    expect(oliveness?.listingType).toBe('own');
  });

  it('all 9 advertised listings have listingType "advertised"', () => {
    const advertised = publishedProperties.filter((p) => p.listingType === 'advertised');
    expect(advertised).toHaveLength(9);
  });

  it('state options include Delta, Lagos, Ogun, Rivers, Abia', () => {
    const expected = ['Abia', 'Delta', 'Lagos', 'Ogun', 'Rivers'];
    for (const s of expected) {
      expect(propertyStates).toContain(s);
    }
  });

  it('no property description or title contains partnership language', () => {
    const forbidden = /\bpartner\b|\bpartnership\b/i;
    for (const p of properties) {
      expect(p.title).not.toMatch(forbidden);
      expect(p.description).not.toMatch(forbidden);
    }
  });
});
