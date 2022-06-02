const { emailAction } = require("../constants");



module.exports = {
    [emailAction.WELCOME]:{
        subject: 'welcome on board',
        templateName: 'welcome'
    }
}