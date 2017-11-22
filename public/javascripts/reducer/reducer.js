import $ from 'jquery';

let tempResult = [];
export default (state = [], action) => {
    switch (action.type) {
        case 'add_link':
            $.ajax({
                type: 'post',
                url: action.url,
                data: { linkValue: action.linkObj },
                async: false,
                success: function(result) {
                    tempResult = result;
                }
            })
            //console.log(tempResult)

            return [...tempResult];
        case 'delete_link':
            $.ajax({
                type: 'DELETE',
                url: action.url,
                data: { id: action.linkObj.id, userName: action.linkObj.userName },
                async: false,
                success: function(result) {
                    tempResult = result;
                }
            })
           return [...tempResult];
        case 'all_links':
            $.ajax({
                type: 'get',
                url: action.url,
                async: false,
                success: function(result) {
                    tempResult = result;
                }
            })
            return [...tempResult];
        default:
            return state;
    }

}