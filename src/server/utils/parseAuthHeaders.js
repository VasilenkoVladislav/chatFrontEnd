export default function parseAuthHeaders (cookies) {
    if (cookies['authHeaders'] === undefined || cookies['authHeaders'].length === 0) {
        return null;
    }
    try {
        return JSON.parse(cookies['authHeaders']);
    } catch (e) {
        return null;
    }
}
