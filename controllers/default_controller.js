
const index = (req, res)=> {
    res.render('../views/index', {
        links:
        [
            {
                link: 'HTML/CSS Crash Course',
                href: '/html-css-crash-course'
            },
            {
                link: 'A Modern Javascript Tutorial',
                href: '/a-modern-javascript-tutorial'
            },
            {
                link: 'NodeJS Crash Course',
                href: '/node-js-crash-course'
            },
            {
                link: 'Mern Stack Tutorial',
                href: '/mern-stack-tutorial'
            },
            {
                link: 'Mern Auth Tutorial',
                href: '/mern-auth-tutorial'
            }
        ]
    });
}
module.exports={
    index
}