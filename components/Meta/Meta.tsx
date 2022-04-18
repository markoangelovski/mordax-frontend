import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
  canonical: string;
}

const Meta = ({ title, description, canonical }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} key="title" />

      <meta name="description" content={description}></meta>
      <meta name="og:description" content={description} />

      {/* <link rel=”canonical” href=”http://websitename.com/” /> */}
      <meta property="og:url" content={canonical} />

      <link rel="icon" href="/favicon.ico" />
      {/* <meta name=”robots” content=”noindex, nofollow” /> */}

      {/* <meta name="og:image" content={image}/> */}
    </Head>
  );
};

export default Meta;
