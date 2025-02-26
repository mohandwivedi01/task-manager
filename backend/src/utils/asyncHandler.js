const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        //next is the flage to tell the funtio to use the middleware
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}
export {asyncHandler}