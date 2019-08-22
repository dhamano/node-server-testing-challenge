module.exports = {
  checkInfo
}

function checkInfo(req, res, next) {
  const { username, password } = req.body;
  let error = 0;

  if( username === undefined || username.trim() === "")     { error++; }
  if( password === undefined || password.trim() === "")     { error = error + 2; }

  switch(error) {
    case 1:
      return res.status(400).json({ message: 'username is required' });
    case 2:
      return res.status(400).json({ message: 'password is required' });
    case 3:
      return res.status(400).json({ message: 'username and password is required' });
    default:
      req.user = { username, password };
      next();
  }
}