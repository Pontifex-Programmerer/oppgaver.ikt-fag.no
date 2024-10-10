// Geir Hilmersen 19 - september 2024
// This modules handles the filepath and coursecontent of the
// tasks-json directory. A template json is found there and it 
// describes how the courses has to be structured to match the 
// ejs template


const {
    readdirSync
}=require('fs');

const taskDir = 'tasks-json'
const path=require('path')

//absolute path to 'tasks-json'
const COURSEDIR = createCoursePath();

function createCoursePath(){
    return path.join(process.cwd(), taskDir);
}

/**
 * @returns a list of files found in the tasks-json directory.
 */
function getFileList() {
    let files = readdirSync(COURSEDIR)
    files = files.filter(file => {
        const regex = /.*\.json/;
        return regex.test(file);
    });
    return files;
}

/**
 * @returns the absoulte path to the director where all the JSON files containing information
 * about the studen worktasks is found
 */
function getCourseDir(){
    return COURSEDIR;
}

module.exports = {
    getCourseDir,
    getFileList
}