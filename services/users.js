import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// CRUD
async function addUser(req, res, next) {
    const temp = {
        email: req.body.email.trim().toLowerCase(),
        username: req.body.username.trim(),
        password: req.body.password,
    };

    try {

        await validateEmail(temp.email);
        await validatePassword(temp.password);

        const user = await User.create(temp);

        if (user) return res.redirect("/users");
    } catch (error) {
        console.error(error);
        res.render("users", { users: [], message: error.message });
    }
}

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        res.render("users", { users, message: null });
    } catch (error) {
        res.render("users", { users: [], message: error.message });
    }
}

async function getByUserEmail(req, res, next) {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });

        if (user) return res.render("user", { user, message: null });

        res.render("users", { users: [], message: "Utilisateur non trouvé" });
    } catch (error) {
        res.render("users", { users: [], message: error.message });
    }
}

async function updateUserByEmail(req, res, next) {
    const email = req.params.email;

    const temp = {
        email: req.body.email.trim().toLowerCase(),
        username: req.body.username.trim(),
        password: req.body.password,
    };

    try {

        const user = await User.findOne({ email });

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.redirect("/users");
        }

        res.render("users", { users: [], message: "Utilisateur non trouvé. Veuillez choisir un utilisateur existant pour la modification" });

    } catch (error) {
        res.render("users", { users: [], message: error.message });
    }
}

async function deleteUserByEmail(req, res, next) {
    const email = req.params.email;

    try {

        await User.deleteOne({ email });

        res.redirect("/users");

    } catch (error) {
        res.render("users", { users: [], message: error.message });
    }
}

// UTILS
async function validateEmailIsUnique(email) {
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error("L'adresse de messagerie existe déjà");
}

async function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Le format de l'adresse de messagerie n'est pas valide");
}

async function validateEmail(email) {
    await validateEmailFormat(email);
    await validateEmailIsUnique(email);
}

async function validatePassword(password) {

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLowercase || !hasUppercase || !hasNumber) {
        throw new Error("Le mot de passe doit contenir minuscule, majuscule et chiffre");
    }
}

async function authenticate(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render("home", { message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("home", { message: "Identifiants incorrects" });
        }

        const userObject = user.toObject();
        delete userObject.password;

        const token = jwt.sign({
            user: userObject
        }, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.cookie("token", token, { httpOnly: true, secure: false });
        res.redirect("/dashboard");

    } catch (error) {
        res.render("home", { message: "Erreur serveur" });
    }
}

async function logout(req, res) {
    res.clearCookie("token", { httpOnly: true, secure: false });
    res.redirect("/");
}

export default { addUser, getAllUsers, getByUserEmail, updateUserByEmail, deleteUserByEmail, authenticate, logout };