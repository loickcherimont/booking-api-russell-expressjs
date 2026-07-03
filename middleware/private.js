import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

async function checkJWT(req, res, next) {

    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Token requis" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        req.decoded = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
}

export default checkJWT;