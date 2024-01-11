// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  let ip;
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  console.log(ip);


  res.status(200).json({
    name: 'John Doe',
    xForwarded: req.headers['x-forwarded-for'],
    xReal: req.headers['x-real-ip'],
    remoteADD: req.connection.remoteAddress,
    userAgen: req.headers['user-agent'],
    ip
  })

}
