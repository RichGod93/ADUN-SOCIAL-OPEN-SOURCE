import Head from "next/head";

// creating an interface for the props
interface PageHeadProps {
    title: string;
    page_name: string;
}

// added generic parameter to the component function
const PageHead = (props: PageHeadProps) => {
    return (
        <>
            <Head>
                <title>{props.page_name ? `${props.title} | ${props.page_name}` : props.title}</title>
                <meta name="ADUN Social" content="Social network for ADUN" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
        </>
    );
};

export default PageHead;