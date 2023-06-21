const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        user_name: {
            type: String,
            required: true,
            trim: true,
        },
        user_email: {
            type: String,
            required: true,
            unique: true,
        },
        user_password: {
            type: String,
            required: true,
        },
        user_info: {
            type: String,
            required: true,
        },
        user_photo: {
            type: String,
        },
        user_is_active: {
            type: Boolean,
        },
        user_token: {
        type: String,
        },
        user_activation_link: {
        type: String,
        },
    },
    {
        versionKey: false,
    }
);
userSchema.set("timestamps", true);

module.exports = model("User", userSchema);
