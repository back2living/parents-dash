import Head from "next/head";

interface ITitle {
    title?: string;
    description: string;
}
const Title = ({title, description}: ITitle) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
                <link rel="icon" href="/logo.svg"/>
            </Head>
        </div>
    );
};

export default Title;