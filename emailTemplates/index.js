const { emailAction } = require("../constants");




module.exports = {
    [emailAction.WELCOME]:{
        subject: 'welcome on board',
        templateName: 'welcome'
    },

    [emailAction.ORDER_COMPLETE]:{
        subject: 'welcome on board',
        templateName: 'Order'
    },
    [emailAction.FORGOT_PASSWORD]:{
        subject: 'welcome on board',
        templateName: 'forgotpassword'
    },    
}