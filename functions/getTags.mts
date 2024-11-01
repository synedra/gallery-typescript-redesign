import { DataAPIClient, Collection } from "@datastax/astra-db-ts";
import { Handler } from "@netlify/functions";

const ASTRA_DB_API_ENDPOINT = process.env["ASTRA_DB_API_ENDPOINT"];
const ASTRA_DB_APPLICATION_TOKEN = process.env["ASTRA_DB_APPLICATION_TOKEN"];

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT);

const handler: Handler = async (event, context) => {
  const options = { limit: 50 };

  try {
    let sections = [];

    let collection = await db.collection("app_collection4");
    
    await collection.find({}, options).forEach((doc) => {
      for (let onetag in doc["tags"]) {
        let tagname = doc["tags"][onetag]
        if (! sections.includes(tagname)) {
            sections.push(tagname)
        }
      }
    })

    sections.sort()

    let response = [{'_id':'all', 'tags' :sections}]

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

export { handler };
