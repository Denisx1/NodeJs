const { ApiError } = require('../errors')
const {SYSTEM_MAIL,SYSTEM_MAIL_PASSWORD, FRONTEND_URL} = require('../config/config')

const EmailTemplate = require('email-templates')
const nodeMailer = require('nodemailer')

const path = require('path')
const templateInfoObject = require('../emailTemplates')



const sendMail = async (receiveMail, emailAction, locals = {}) =>{
    const templateRendere = new EmailTemplate({
        views: {
            root:path.join(process.cwd(), 'emailTemplates')
        }
    })

    const templateInfo = templateInfoObject[emailAction]

    if(!templateInfo){
        throw new ApiError('wrong email action', 500)
    }

    locals = {...locals, frontendUrl:FRONTEND_URL}

    const html = templateRendere.render(templateInfo.templateName, locals)    
    
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth:{
            user: SYSTEM_MAIL,
            pass: SYSTEM_MAIL_PASSWORD
        }
    })

    await  transporter.sendMail({
        from: 'Noreply.com',
        to: receiveMail,
        subject: templateInfo.subject, 
        html
    })
}


module.exports = {
    sendMail
}