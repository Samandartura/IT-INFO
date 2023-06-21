const errorHandler = async (res, error) => {
    res.send({ message: `Xatolik ${error}` });
};

module.exports = { errorHandler };
