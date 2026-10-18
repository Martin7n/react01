export default function login_cleaner(email, pwd) {
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const cleanPwd = pwd ? pwd.trim() : "";

    if (cleanPwd.length < 6 || cleanEmail.length < 6) {
        return { isValid: false, error: "Please, check you credentials" };
    }

    return {
        isValid: true,
        error: null,
        data: {
            email: cleanEmail,
            password: cleanPwd,
        },
    };
}
