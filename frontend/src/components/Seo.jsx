const SITE_URL = "https://vibifymarketing.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

// Uses React 19 native document metadata: <title>/<meta>/<link> rendered here
// are automatically hoisted into <head> (and captured by react-snap prerender).
export const Seo = ({ title, description, path = "/", image, noindex = false, jsonLd }) => {
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_IMAGE;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Vibify" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};

export const SITE = SITE_URL;
export default Seo;
