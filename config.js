const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
    JWT_SECRET_USER,
    JWT_SECRET_ADMIN,
    MONGODB_URL
}