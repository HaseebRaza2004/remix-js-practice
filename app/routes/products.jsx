import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


const SHOPIFY_API_URL = `https://${process.env.SHOPIFY_STORE}.myshopify.com/admin/api/2023-10/graphql.json`;
// const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const SHOPIFY_ACCESS_TOKEN = "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";

export const loader = async () => {
    console.log("SHOPIFY_API_URL =>",SHOPIFY_API_URL);
    console.log("SHOPIFY_ACCESS_TOKEN =>",SHOPIFY_ACCESS_TOKEN);

    const response = await fetch(SHOPIFY_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({
            query: `{ products(first: 5) { edges { node { id title handle } } } }`,
        }),
    });

    const data = await response.json();
    return json(data.data.products.edges);
};

export default function Products() {
    const products = useLoaderData();
    console.log(products);
    
    return (
        <div>
            <h1>Shopify Products</h1>
            <ul>
                {products.map(({ node }) => (
                    <li key={node.id}>{node.title}</li>
                ))}
            </ul>
        </div>
    );
}
