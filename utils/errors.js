class ValidationError extends Error {
}

class NotFoundError extends Error {
}


const handleError = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: 'Page not found',
            })

    } else {
        res
            .status(err instanceof ValidationError ? 400 : 500)
            .render('error', {
                message: err instanceof ValidationError ? err.message : 'Sorry, please try again in a few minutes'
            })
    }
    console.error(err)
};

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
}