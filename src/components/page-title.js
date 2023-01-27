import Head from "next/head";
import React from "react";

function PageTitle({ title }) {
  return (
    <Head>
      <title>{`${title} | Technical`}</title>
      <meta
        name="description"
        content={`${title} Assignment`}
      />
    </Head>
  );
}

export default PageTitle;