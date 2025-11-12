export const sendError = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};
