import express from "express";
import shopify from "../client/shopify";
const router = express.Router();
import Stripe from "stripe";
import { ApiVersion, DeleteRequestParams } from "@shopify/shopify-api";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});

type ShopifyDeleteResponse = {
  customerDelete: {
    shop: {
      id: string;
    };
    userErrors: string[];
    deletedCustomerId: string;
  };
};

const deleteCustomerMutation = `
  mutation customerDelete($id: ID!) {
    customerDelete(input: {id: $id}) {
      shop {
        id
      }
      userErrors {
        field
        message
      }
      deletedCustomerId
    }
  }`;

router.post("/create_payment_intent", (req, res) => {
  console.log("request", req.query);
  res.send("respond with a resource");
});

router.post("/ephemeral_keys", async (req, res) => {
  const { api_version } = req.query;
  console.log("query", req.query);
  try {
    const key = await stripe.ephemeralKeys.create(
      { customer: "cus_NYdnkbtwWXbhmQ" },
      { apiVersion: `${api_version}` }
    );
    res.json(key);
  } catch (e) {
    console.error(e);
    res.send(500);
  }
});

router.post("/delete_account", async (req, res) => {
  const session = shopify.session.customAppSession(
    "exotic-isopods-composting-worms.myshopify.com"
  );
  const client = new shopify.clients.Graphql({
    session,
    apiVersion: ApiVersion.April23,
  });

  const response = await client.query<DeleteRequestParams>({
    data: {
      query: deleteCustomerMutation,
      variables: { id: req.query.customer_id },
    },
  });
  const data = response.body.data as ShopifyDeleteResponse;
  if (data?.customerDelete.deletedCustomerId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

export default router;
