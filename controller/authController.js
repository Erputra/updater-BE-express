const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendSuccessRes, sendErrorRes } = require('../utils/responses');

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
                username: username,
                password: hashedPassword,
                emailVerifiedAt: email,
        });
        return sendSuccessRes(res, user, 'Register Successfully');
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            const validationErrors = error.errors.map(errorItem => errorItem.message);
            return sendErrorRes(res, validationErrors, 'Validation error');
        }
        console.log(error);
        return sendErrorRes (res, [], 'Register failed');
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
            const user = await User.findOne({ where: { username } });
            if (!user){
                return sendErrorRes(res, [], 'User not found!');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return sendErrorRes(res, [], 'Invalid password!');
            }
            console.log(process.env.JWT_SECRET);
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
            return sendSuccessRes(res, { username: user.username, token: token }, 'Login successfull');
    } catch (error) {
        return sendErrorRes (res, [], 'Login failed' + error);
    }
}

module.exports = { registerUser, login }