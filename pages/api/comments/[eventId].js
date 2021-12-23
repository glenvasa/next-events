
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to database" });
    return;
  }

  if (req.method === "POST") {
    // server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close()
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      res
      .status(201)
      .json({ message: "New comment created", comment: newComment });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to insert data into database collection" });
    }

    console.log(result);

    // this code would add the MongoDb auto created id to the newComment object we send back
    // front end with 201 code below.
    // However, it looks like MongoDb automatically added it to the result object it returned so I will leave out this code for now
    //   newComment._id = result.insertedId

    
  }

  if (req.method === "GET") {
    // will get us all documents in comments collection and covert to array
    // which is the format we need to map them in comments-list component
    // sort will sort mongodb's created _id in decending order so that newest comment returned first
    // const documents = await db.collection("comments").find().sort({ _id: -1}).toArray();

    // changing how we call getAllDocuments to only get comments for a specific event
    // importing getAllDocuments from helper db-util.js

    let documents;

    try {
      documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status().json({ message: "Getting comments failed" });
    }
  }

  client.close();
}

export default handler;
