export default function reguser_simple_validator(email, pwd, pwd2) {
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const cleanPwd = pwd ? pwd.trim() : "";
    const cleanPwd2 = pwd2 ? pwd2.trim() : "";

    if (cleanPwd.length < 6) {
        return {
            isValid: false,
            error: "Password must be at least 6 characters long.",
        };
    }
    if (cleanPwd !== cleanPwd2) {
        return { isValid: false, error: "Passwords do not match!" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (cleanEmail.length < 5 || !emailRegex.test(cleanEmail)) {
        return { isValid: false, error: "Please enter a valid e-mail" };
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
