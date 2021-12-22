function handler(req, res){
    const eventId = req.query.eventId
    
    if (req.method === 'POST') {
        // server-side validation
      const {email, name, text} = req.body

      if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
        res.status(422).json({message: 'Invalid input'})  
        return
      }

  
      const newComment = {
          id: new Date().toISOString(),
          email, 
          name, 
          text
      }   
       
      console.log(newComment);
      res.status(201).json({message: 'New comment created', comment: newComment})
    }

    if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Glen', text: 'A first comment'},
            { id: 'c2', name: 'Ethan', text: 'A second comment'}
        ]

        res.status(200).json({comments: dummyList})
    }

    
}

export default handler