import axios from 'axios';
module.exports = {
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