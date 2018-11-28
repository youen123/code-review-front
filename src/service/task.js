import * as Http from '../util/http';

let newTask = (data) => {
    return Http.post('task/newTask', data)
}

let getTasks = ({ searchContent }) => {
    return Http.get('task/getTasks', { searchContent })
}

let getTaskDetail = (id) => {
    return Http.get('task/getTaskDetail', {id});
}

let closeTask = (id) => {
    return Http.post('task/closeTask', {id})
}

let addComment = ({taskId, type, content, file, commit1, commit2, block_index, line_index}) => {
    return Http.post('task/addComment', {taskId, type, content, file, commit1, commit2, block_index, line_index});
}

let getComments = ({taskId}) => {
    return Http.get('task/getComments', {taskId});
}

export {
    newTask,
    getTasks,
    getTaskDetail,
    closeTask,
    addComment,
    getComments
}