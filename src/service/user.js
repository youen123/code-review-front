import * as Http from '../util/http';
import * as Cookie from '../util/cookie'

let login = ({name, password}) => {
    return Http.post('user/login', {name, password});
}

let logout = () => {
    return Http.post('user/logout');
}

export {
    login,
    logout,
}