const { json } = require("express");

function sendSuccessRes (res, data, message) {
    return res.json({success: true, data, message});
}

function sendErrorRes (res, data, message) {
    return res.json({success: false, data, message});
}

module.exports = { sendSuccessRes, sendErrorRes }