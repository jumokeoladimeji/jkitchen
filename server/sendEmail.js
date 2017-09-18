// nodemailer = require('nodemailer'),

// const sendEmail = (req, res, user, task) => {
// const fromEmail = noreply@jkitchen.com;
// const transporter = nodemailer.createTransport();

// if (task == 'confirm delivery'){
//   const url = 'http://' + req.headers.host + '/user/confirmDelivery';
// }

// const mailBody = {
//   from: fromEmail,
//   to: user.email,
//   subject: 'Verify Email',
//   html: "Hi " + user.username + ",<br><br>Please visit this url to confirm your delivery: <br>" + "<a href= '" + url + "'>" + url + "</a><br><br>" + "Regards, <br>"
// };
// transporter.sendMail(mailBody, function(err, message) {
//   if (err) {
//     console.log('err', err);
//     return res.status(400).json(err);
//   } else {
//     return res.status(200).json({
//       message: 'An email has been sent to ' + user.email + ' with further instructions.',
//       user: user
//     });
//   }
// });
// };