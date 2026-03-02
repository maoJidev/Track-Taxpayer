/**
 * Simple obfuscation for IDs in URLs
 * Note: This is NOT encryption. It is just to hide the raw ID from visual inspection.
 */

export const encodeId = (id) => {
    try {
        return btoa(id);
    } catch (e) {
        console.error("Failed to encode ID", e);
        return id;
    }
};

export const decodeId = (encodedId) => {
    try {
        return atob(encodedId);
    } catch (e) {
        console.error("Failed to decode ID", e);
        return encodedId;
    }
};
