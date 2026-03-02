/**
 * Utility for safe URL parameter obfuscation (Base64)
 * Handles Thai characters and ensures they can be decoded correctly.
 * Modified to be URL-safe (replacing +, / and removing =)
 */

export const encodeParam = (str) => {
    if (!str || str === '-') return '-';
    try {
        // 1. Use btoa with encodeURIComponent to handle non-ASCII/Thai characters
        let base64 = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));

        // 2. Make URL Safe: + -> -, / -> _, remove =
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (e) {
        console.error("Failed to encode param:", e);
        return str;
    }
};

export const decodeParam = (str) => {
    if (!str || str === '-') return '-';
    try {
        // 1. Revert URL Safe chars: - -> +, _ -> /
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

        // 2. Add padding if missing
        while (base64.length % 4) {
            base64 += '=';
        }

        // 3. Use atob with decodeURIComponent
        return decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    } catch (e) {
        console.error("Failed to decode param:", e);
        return str;
    }
};
