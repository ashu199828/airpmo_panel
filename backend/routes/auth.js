const express = require('express');
const bcrypt = require('bcryptJs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'harry is a good b@oy'

router.post('/createuser',[
 
  body('email','Enter a valid email').isEmail(),
  body('name','Enter a valid name').isLength({ min: 3 }),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) =>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    
 
  let user = await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({error: "sorry a user with this email is already existed"})
  }
  const salt = await bcrypt.genSalt(10)
   const secpass = await bcrypt.hash( req.body.password, salt);
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secpass,
  })

  data = {user:{
    id:user.id
  }};
  success = true;
  const authtoken = jwt.sign(data,JWT_SECRET)
  res.json({success,authtoken})
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error")
}
  // .then(user => res.json(user)).catch(
  // err => res.json({err:"please enter a unique value for email"}))

  


 
})


router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','password cannot be blank').exists(),
], async (req, res) =>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body
  try {
    let user = await User.findOne({email});
    if(!user){
      success = false;
    return res.status(400).json({error:'please try to login with correct credentials'})
  }

    const passwordcompare = await bcrypt.compare(password, user.password);
    if(!passwordcompare){
      success = false;
    return res.status(400).json({success, error:'please try to login with correct credentials'})
  }

  const data = {
    user:{
    id:user.id
  }
};
  const authtoken = jwt.sign(data,JWT_SECRET)
  success = true;
  res.json({success, authtoken})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error")
}

})



router.post('/getuser',fetchuser, async (req, res) =>{

  try {
  userid = req.user.id
  const user = await User.findById(userid).select('-password')
  res.send(user);
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error")
}

})


module.exports = router