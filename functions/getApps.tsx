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
    if (alltags.length > 1) {
      filter = { title: { $in: alltags } };
    } else if (alltags.length == 1) {
      filter = { title: alltags[0] };
    } else {
      filter = { };
    }
    
  }

  console.log("Filter: ")
  console.log(filter)

  let documents = [];
      
  try {
    let collection = db.collection("tag_application");
    await collection.find(filter).forEach((doc) => {
      for (let app in doc.apps) {
        documents.push(doc.apps[app])
      }
    })
    
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
