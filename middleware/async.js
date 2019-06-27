module.exports = ((handler) => {
    //handler is the whole route call back thats being passed her
    return async(req, res, next) => {
        try{
            await handler(req, res);
        }catch(error){ 
            next(error); //passed to the error middleware
        }
    }
})