var nodemailer = require('nodemailer');


const sendMail =async(email,password)=>{
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lathamani3636@gmail.com',
      pass: process.env.PASSWORD
    }
  });
  
  var mailOptions = { 
    from: '727723eumt084@gmail.com',
    to: email,
    subject: 'Account Created - DumperDynamiX',
    text: ` Your operator account has been successfully created at DumpDynamix. Below are your login credentials:

Username: ${email}
Password: ${password}

Please log in using these credentials. We recommend changing your password after your first login.

If you have any questions, feel free to reach out to our support team.

Best regards,
DumpDynamix Team`
  };
  
 const response = await transporter.sendMail(mailOptions);
 if(response){
  console.log("Mail sent")
  return true
 }
 else{
  return false
 }
}


module.exports = sendMail