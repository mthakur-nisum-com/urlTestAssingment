
let tempResult = [];
export default (state = tempResult, action) => {
    switch (action.type) {
        case 'links':
            return action.data;
        default:
            return state;
    }

}