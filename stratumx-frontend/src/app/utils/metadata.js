export const siteConfig = {
  name: "StratumX",
  url: "https://stratumx.onrender.com",
  ogImage: "https://stratumx.onrender.com/logo.png",
  description: {
    en: "The ultimate fullstack showcase combining a modern portfolio, dynamic e-commerce, and a powerful admin dashboard.",
    ar: "المنصة المتكاملة التي تجمع بين واجهة عرض حديثة، متجر إلكتروني ديناميكي، ولوحة تحكم قوية.",
  },
};

export function generatePageMetadata({
  title,
  description,
  path,
  lang = "en",
}) {
  const isAr = lang === "ar";
  const baseTitle = isAr ? "ستراتم اكس" : "StratumX";
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  const defaultDesc = isAr
    ? siteConfig.description.ar
    : siteConfig.description.en;
  const finalDesc = description || defaultDesc;

  return {
    title: fullTitle,
    description: finalDesc,
    openGraph: {
      title: fullTitle,
      description: finalDesc,
      url: `${siteConfig.url}${path || ""}`,
      siteName: baseTitle,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: finalDesc,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}${path || ""}`,
    },
  };
}
