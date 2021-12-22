function handler (req, res) {
    if (req.method === 'POST'){
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid Email Address'})
            return
        } 
        console.log(userEmail);
        res.status(201).json({message: `${userEmail} successfully signed up for the newsletter!`})
       
    }
}

export default handler