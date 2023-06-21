const { errorHandler } = require("../helpers/error_handler");
const Dictionary = require("../models/dictionary");

const addTerm = async (req, res) => {
    try {
        const { term } = req.body;
        const dict = await Dictionary.findOne({
            term: { $regex: term, $options: "i" },
        });
        if (dict) {
            return res.status(400).send({ message: "Term exists" });
        }
        const newTerm = await Dictionary({
            term,
            letter: term[0],
        });
        await newTerm.save();
        res.status(200).send({ message: "Term added" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getTerms = async (req, res) => {
    try {
        const terms = await Dictionary.find({});
        if (terms.length < 1) {
            return res.status(400).send({ message: "Terms not found" });
        }
        res.json(terms);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getTermsByLetter = async (req, res) => {
    try {
        const terms = await Dictionary.find({ letter: req.params.letter });
        if (terms.length < 1) {
            return res.status(400).send({ message: "Terms not found" });
        }
        res.json(terms);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getTermById = async (req, res) => {
    try {
        const term = await Dictionary.findOne({ _id: req.params.id });
        if (!term) {
            return res.status(400).send({ message: "Term not found" });
        }
        res.json(term);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getTermsByTerm = async (req, res) => {
    try {
        const terms = await Dictionary.find({ term: req.params.term });
        if (terms.length < 1) {
            return res.status(400).send({ message: "Terms not found" });
        }
        res.json(terms);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateTermById = async (req, res) => {
    try {
        const { term } = req.body;
        const updated = await Dictionary.updateOne(
            { _id: req.params.id },
            { $set: { term, letter: term[0] } }
        );
        if (!updated.acknowledged) {
            return res.status(400).send({ message: "Term is not updated" });
        }
        res.status(200).send({ message: "Term is updated" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteTermById = async (req, res) => {
    try {
        const deleted = await Dictionary.deleteOne({ _id: req.params.id });
        if (!deleted.acknowledged) {
            return res.status(400).send({ message: "Term is not deleted" });
        }
        res.status(200).send({ message: "Term is deleted" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addTerm,
    getTerms,
    getTermsByLetter,
    getTermById,
    getTermsByTerm,
    updateTermById,
    deleteTermById,
};
