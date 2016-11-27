/*globals require module  */
/*jshint esversion: 6 */

module.exports = function(data){
    return {
        home(req,res) {
            return res.render('home',{
                user: req.user
            });
        }
    };
};