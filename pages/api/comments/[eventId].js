import {MongoClient} from 'mongodb'

async function handler(req, res){
    const eventId = req.query.eventId

    const client = await MongoClient.connect(
        "mongodb+srv://next-events:next-events@cluster0.oturw.mongodb.net/events?retryWrites=true&w=majority"
      );
    
    if (req.method === 'POST') {
        // server-side validation
      const {email, name, text} = req.body

      if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
        res.status(422).json({message: 'Invalid input'})  
        return
      }

  
      const newComment = {
          email, 
          name, 
          text,
          eventId
      }   

      const db = client.db()
      
      const result = await db.collection('comments').insertOne(newComment)
      
      console.log(result);

    // this code would add the MongoDb auto created id to the newComment object we send back
    // front end with 201 code below.
    // However, it looks like MongoDb automatically added it to the result object it returned so I will leave out this code for now
    //   newComment.id = result.insertedId

      res.status(201).json({message: 'New comment created', comment: newComment})
    }

    if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Glen', text: 'A first comment'},
            { id: 'c2', name: 'Ethan', text: 'A second comment'}
        ]

        res.status(200).json({comments: dummyList})
    }

    client.close()
}

export default handler