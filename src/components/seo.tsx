import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import favicon16 from "../images/favicon16.png";
import favicon32 from "../images/favicon32.png";
import favicon64 from "../images/favicon64.png";

interface ISEOProps {
  title?: string;
  description?: string;
  lang?: string;
  meta?: IMeta[];
}

interface IMeta {
  name: string;
  content: string;
}

const SEO: React.FC<ISEOProps> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? `${title} | ` : ""}
      titleTemplate={`%s${site.siteMetadata.title}`}
      defer={false}
      link={[
        { rel: "icon", type: "image/png", sizes: "16x16", href: `${favicon16}` },
        { rel: "icon", type: "image/png", sizes: "32x32", href: `${favicon32}` },
        { rel: "shortcut icon", type: "image/png", href: `${favicon64}` },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
