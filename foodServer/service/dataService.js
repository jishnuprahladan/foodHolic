const db = require('./db')

const jwt = require('jsonwebtoken')

registers = (fname, lname, phone, email, password) => {
  // if (acno in userDetails) {
  return db.User.findOne({ email }).then(user => {                                  //async call - to access promiss (then)
    if (user) {
      return {
        status: false,
        message: "user already exisist",
        statusCode: 401
      }
    } else {
      // create a new user object in db
      const newUser = new db.User({
        email,
        fname: fname,
        lname: lname,
        phone: phone,
        password: password,
      })
      // save to database
      newUser.save()
      return {
        status: true,
        message: "register success",
        statusCode: 200
      }
    }
  })
}
Login = (email, password) => {
  // if (acno in userDetails) {
  return db.User.findOne({ email, password }).then(user => {
    if (user) {
      currentUser = user.fname
      const token = jwt.sign({ email }, "supersecretkey123")
      return {
        status: true,
        message: "login success",
        statusCode: 200,
        currentUser,
        token
      }
    } else {
      return {
        status: false,
        message: "incorrect account no or passward",
        statusCode: 401
      }
    }
  })
}
viewAllFood = () => {
  return db.Food.find().then(item => {
    if (item) {
      return {
        status: true,
        message: " success",
        statusCode: 200,
        food: item
      }
    }
  })
}

viewFood = (id) => {
  return db.Food.find({ id }).then(item => {
    if (item) {
      return {
        status: true,
        message: " success",
        statusCode: 200,
        food: item
      }
    }
  })
}


module.exports = {
  registers,
  Login,
  viewAllFood,
  viewFood
}