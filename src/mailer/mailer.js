// use nodemailer to send mails
import nodemailer from 'nodemailer';

// mailing
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eosemegbe@gmail.com',
      pass: 'tgnlcemksrltdena'
    }
  });

  export class testt {
      logSome(lol){
          console.log(lol)
      }
  }