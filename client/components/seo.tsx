import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  keywords?: string
}

export function SEO({ title, description, keywords }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Head>
  )
}
