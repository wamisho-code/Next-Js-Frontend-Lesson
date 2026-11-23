import { UserPayload } from "../dto/dtos";

export function decodeToken(token: string): UserPayload {
    const payload = token.split(".")[1];

    const base64 = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const decoded = atob(base64);
    const claims = JSON.parse(decoded);

    return {
        id: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        name: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        exp:claims.exp
    };
}