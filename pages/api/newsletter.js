import {connectDatabase, insertDocument} from '../../helpers/db-util'


async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    let client

    try {
      client = await connectDatabase() 
    } catch (error) {
        res.status(500).json({message: 'Connecting to database failed'})
        return
    }

    try {
       await insertDocument(client, 'newsletter', { email: userEmail}) 
       client.close()
    } catch (error) {
        res.status(500).json({message: 'Inserting data in database failed'})
    }
    
    

    

    res.status(201).json({
      message: `${userEmail} successfully signed up for the newsletter!`,
    });
  }
}

export default handler;
