// Helper to catch async errors vs multiple try/catch blocks
export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
