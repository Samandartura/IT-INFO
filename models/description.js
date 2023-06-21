const { Schema, model } = require("mongoose");

const descriptionSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    {
        versionKey: false,
    }
);

module.exports = model("Description", descriptionSchema);
