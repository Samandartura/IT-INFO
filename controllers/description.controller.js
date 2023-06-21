const { errorHandler } = require("../helpers/error_handler");
const Description = require("../models/description");

const addDescription = async (req, res) => {
    try {
        const { description, category_id } = req.body;
        const desc = await Description.findOne({ category_id: category_id });
        if (desc) {
            return res
                .status(400)
                .send({ message: "Description with such as id exists " });
        }
        const newDesc = await Description({
            description,
            category_id,
        });
        await newDesc.save();
        res.status(200).send({ message: "Description added" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getDescriptions = async (req, res) => {
    try {
        const desc = await Description.find({}).populate("category_id");
        if (desc.length < 1) {
            return res.status(400).send({ message: "Descriptions not found" });
        }
        res.json(desc);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addDescription,
    getDescriptions,
};
