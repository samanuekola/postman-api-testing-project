const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let users = [
  { id: 1, name: "John", email: "john@test.com" },
  { id: 2, name: "Sarah", email: "sarah@test.com" }
]

const USER = {
  email: "admin@test.com",
  password: "1234"
}

app.post("/login", (req, res) => {

  const { email, password } = req.body

  if (email === USER.email && password === USER.password) {
    return res.json({
      message: "Login successful"
    })
  }

  res.status(401).json({
    message: "Invalid credentials"
  })

})

app.get("/users", (req, res) => {
  res.json(users)
})

app.post("/users", (req, res) => {

  const user = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email
  }

  users.push(user)

  res.json({
    message: "User created",
    user
  })
})

app.put("/users/:id", (req, res) => {

  const id = parseInt(req.params.id)

  users = users.map(user =>
    user.id === id ? { ...user, ...req.body } : user
  )

  res.json({
    message: "User updated"
  })
})

app.delete("/users/:id", (req, res) => {

  const id = parseInt(req.params.id)

  users = users.filter(user => user.id !== id)

  res.json({
    message: "User deleted"
  })
})

app.listen(4000, () => {
  console.log("API running on port 4000")
})