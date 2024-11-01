import { DataAPIClient, Collection } from "@datastax/astra-db-ts";
import { Handler } from "@netlify/functions";

const ASTRA_DB_API_ENDPOINT = process.env["ASTRA_DB_API_ENDPOINT"];
const ASTRA_DB_APPLICATION_TOKEN = process.env["ASTRA_DB_APPLICATION_TOKEN"];

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT);

const handler: Handler = async (event, context) => {
  let filter = {};

  if (event.queryStringParameters && event.queryStringParameters.tag) {
    let alltags = event.queryStringParameters.tag.split(",");
    if (alltags.length != 0 ) {
      filter = { tags: { $all: alltags } };
    } else {
      filter = { };
    }
  }

  let documents = [];
      
  try {
    let collection = db.collection("app_collection4");
    await collection.find(filter).forEach((doc) => {
      documents.push(doc)
      })
    console.log(documents)
    return {
      statusCode: 200,
      body: JSON.stringify(documents),
    };
  } catch (e) {
    console.log(e)
      
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

export { handler };
