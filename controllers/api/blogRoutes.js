const router = require("express").router();
const { Post, Comment, User } = require();
// const withAuth = require('')

router.post("/", withAuth, (req, res) => {
  const body = req.body;
  console.log(req.session.userID);
});
