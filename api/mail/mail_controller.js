import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import { promises as fs } from 'fs';
import path from 'path'
import _  from 'lodash'
import { User } from '../users/user_model'



export class MailController {

    constructor(){

        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e4bddf076f94ee",
                pass: "b3692275fe58c9"
            }
        });

        this.User = User

    }

    verificationMailSender = async(data) => {

        try {

            const token = data.token
            const name = data.name
            const email = data.email
            const url = `http://localhost:3000/mail/confirm/${token}`;

            const hbs_file = await fs.readFile(path.resolve(__dirname, 'mail_views.hbs'), {encoding: 'utf-8'})
            const template = Handlebars.compile(hbs_file)
            const updated_template = template({
                name: name,
                url: url
            })


            this.transporter.sendMail({
                to: email,
                from: 'wallet.test@mail.com',
                subject: 'Confirm Mail',
                html: updated_template
        })

        } catch (error) {
            console.log(error);
        }
    }

    confirm = async(req, res) => {

        try {

            const user = jwt.verify(req.params.token, 'SecretKey');
            const user_ID = user._id;
            const found_user = await this.User.findById(user_ID);
            if(!found_user) return res.status(400).send('Verification not successfull!!');

            await this.User.findByIdAndUpdate(user_ID, {
                $set: { isVerified: true }
            }, { new: true })

            res.redirect('http://localhost:3000/');

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }


}