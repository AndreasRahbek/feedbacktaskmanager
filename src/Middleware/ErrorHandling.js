const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong')
}

const notFoundHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(404).send('Page not found')
}

module.exports = {errorHandler, notFoundHandler};
