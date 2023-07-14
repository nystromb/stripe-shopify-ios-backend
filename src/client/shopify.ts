import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";

const shopify = shopifyApi({
    adminApiAccessToken: process.env.ADMIN_API_SHOPIFY_ACCESS_KEY,
    apiSecretKey: process.env.ADMIN_API_SHOPIFY_KEY_SECRET,
    isCustomStoreApp: true,
    scopes: ['read_customers', 'write_customers'],
    hostName: process.env.HOSTNAME,
    hostScheme: 'https',
    apiVersion: ApiVersion.April23,
    isEmbeddedApp: false
})

export default shopify;