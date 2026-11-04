const LOGO_URL =
  "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793818942/jemack_properties_logo_transparent_mh7ikf.png";

/**
 * Company logo — uses the uploaded transparent PNG.
 * The `inverted` prop is kept for API compatibility but has no effect
 * since the image already works on both light and dark backgrounds.
 */
export function Logo({ inverted: _inverted = false }: { inverted?: boolean }) {
  return (
    <img
      src={LOGO_URL}
      alt="Jemack Properties"
      width={160}
      height={48}
      className="h-10 w-auto object-contain"
      loading="eager"
    />
  );
}
