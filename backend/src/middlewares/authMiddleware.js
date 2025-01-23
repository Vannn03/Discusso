import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access!" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token!" });
    }
};

export const verifyAuth = (req, res) => {
    const token = req.cookies.authToken;

    if (token) {
        res.json({ authorized: true });
    } else {
        res.json({ authorized: false });
    }
};

export const getLoggedInUser = async (req, res) => {
    const { email } = req.user;

    try {
        console.log(req.user);
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                username: true,
                email: true,
                password: true,
                profile_picture: true,
                bio: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
