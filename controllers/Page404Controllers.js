const getPage404 = (req, res, next) => {
    res.status(404).render('page404', {title: 'ERROR 404'});
    console.log('Error Page Loaded');
};
 exports.getPage404 = getPage404;