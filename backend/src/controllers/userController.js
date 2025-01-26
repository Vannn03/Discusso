export const editUser = async (req, res) => {
    const { username, bio } = req.body;
    const { email } = req.user;
    const profilePicture = req.file ? req.file.path : null;

    if (!username) {
        return res.status(400).json({ error: "Invalid username!" });
    }

    try {
        const updateUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                username: username,
                bio: bio,
                ...(profilePicture && { profile_picture: profilePicture }),
            },
        });

        res.status(200).json({
            message: "Update user successful!",
            updateUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user!" });
    }
};

export const deleteAccount = async (req, res) => {
    const { email } = req.user;

    try {
        await prisma.user.delete({
            where: {
                email: email,
            },
        });

        res.clearCookie("authToken");
        res.status(200).json({
            message: "Delete account successful!",
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete account!" });
    }
};
