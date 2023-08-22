import Head from "next/head";

// added generic parameter to the component function
const PageHead = ({ title, page_name }) => {
    return (
        <>
            <Head>
                <title>{page_name ? `${title} | ${page_name}` : title}</title>
                <meta name="ADUN Social" content="Social network for ADUN" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
        </>
    );
};

export default PageHead;