const getPage404 = (req, res, next) => {
    res.status(404).render('page404', {title: 'ERROR 404'});
};
 exports.getPage404 = getPage404;