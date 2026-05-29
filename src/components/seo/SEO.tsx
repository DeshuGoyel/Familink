import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: string;
  imageUrl?: string;
  schema?: any;
  noindex?: boolean;
  publishedTime?: string;
}

export function SEO({
  title,
  description,
  keywords = "crypto inheritance, digital will, what happens to crypto when you die, Bitcoin inheritance, seed phrase inheritance, password inheritance, digital legacy vault, private key inheritance, crypto estate planning",
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : "https://transferlegacy.com/",
  type = "website",
  imageUrl = "https://transferlegacy.com/og-image.png",
  schema,
  noindex = false,
  publishedTime
}: SEOProps) {
  const schemaString = typeof schema === 'object' ? JSON.stringify(schema) : schema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Structured Data (Schema.org) */}
      {schemaString && (
        <script type="application/ld+json">
          {schemaString}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
