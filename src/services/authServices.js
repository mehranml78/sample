export function getAutentication() {
    // remove ! after test
    if (!localStorage.getItem("token")) {
        return true
    } else return false
}