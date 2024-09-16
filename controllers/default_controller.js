const index = (req, res)=> {
    res.render('../views/index', {
        links:
        [
            {
                link: 'assignment1',
                href: 'www.vg.no'
            },
            {
                link: 'assignment2',
                href: 'www.db.no'
            }
        ]
    });
}
module.exports={
    index
}