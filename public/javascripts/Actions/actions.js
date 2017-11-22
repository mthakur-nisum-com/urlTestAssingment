import constants from '../constants/constants';
module.exports = {

    addLink: function(linkObj) {
        return {
            type: constants.addLink.actionType,
            linkObj: linkObj,
            url:constants.addLink.url
        }

    },
    getAllLinks: function() {
        return {
           type: constants.getLinks.actionType,
            url:constants.getLinks.url
        }
    },
    deleteLink: function(linkObj) {
        return {
            type: constants.deleteLink.actionType,
            linkObj: linkObj,
            url:constants.deleteLink.url
        }
    }
}