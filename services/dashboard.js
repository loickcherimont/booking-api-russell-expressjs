async function getHomepage(req, res, next) {
    const currentUser = req.decoded.user;
    const pages = [
        {name: "Catways", link: "/catways"},
        // {name: "Réservations", link: "/reservations"},
        {name: "Utilisateurs", link: "/users"}
    ]
    res.render("dashboard", { pages, currentUser });
}

export default getHomepage;