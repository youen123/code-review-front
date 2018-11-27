import * as Http from '../util/http';

let getFileList = ({ repo, branch, commit1, commit2 }) => {
    return Http.get('diff/getDiffFileListOfSameBranch', { repo, branch, commit1, commit2 });
}

let getDiffHTML = ({repo, commit1, commit2, file}) => {
    return Http.get('diff/getDiffFileHTML', { repo, commit1, commit2, file });
}

export {
    getFileList,
    getDiffHTML
}