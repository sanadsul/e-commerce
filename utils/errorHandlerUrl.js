
{/* Error Handler url */}
const errorHandlerUrl = (req, res, next) => {
    return res.status(404).json({
        status: 'Failed',
        error: 'url not found',
        url: req.originalUrl,
        method: req.method,
        data: null,
        timestamp: Date.now(),
    });
}

export { errorHandlerUrl };