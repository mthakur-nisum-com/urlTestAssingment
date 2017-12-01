import constants from '../constants/constants';
import axios from 'axios';
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
    },
    handleAjax:function(dispatch,userObj){
        axios({
            method:userObj.requestType,
            url:userObj.url,
            data:userObj.data
        }).then(function(response){
            if(response.status === 200){
                dispatch({type:userObj.actionType,data:response.data})
            }
        })
    }
}