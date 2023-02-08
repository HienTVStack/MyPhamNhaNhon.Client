import authApi from "../api/authApi";

const authUtil = {
    isAuthenticated: async () => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const res = await authApi.verifyToken();
            return res.user;
        } catch {
            localStorage.removeItem("token")
            return false;
        }
    },
};

export default authUtil;
