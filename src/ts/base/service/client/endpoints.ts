const ENDPOINTS = {
    GIPHY: {
        TRENDING: {NAME: "GIPHY_TRENDING", method: "GET", url: "/giphy/trending" },
        SEARCH: {NAME:"GIPHY_SEARCH", method: "GET", url: "/giphy/search" },
    },
    USER: {
        CURRENT: {NAME: "CURRENT_USER", method: "GET", url: "/e/users/current" },
        LOGOUT: {NAME: "LOGOUT", method: "POST", url: "/auth/2l8s118z69mkq91m3y6r161bq8yp4hmsgaveoqzivvzfs45kb1/logout" },
    },
    COMMENT: {
        CREATE: {NAME:"CREATE_COMMENT", method: "POST", url: "/e/comments"},
        GET_BY_VIDEO_ID: {NAME: "GET_COMMENT_BY_VIDEO_ID", method: "GET", url: "/e/comments/byVideoId/:videoId"},
        LIKE: {NAME: "COMMENT_LIKE", method: "POST", url: "/e/comments/:commentId/like"},
        DISLIKE: {NAME: "COMMENT_DISLIKE", method: "POST", url: "/e/comments/:commentId/dislike"},
        DELETE: {NAME: "DELETE_COMMENT", method: "DELETE", url: "/e/comments/:commentId"},
        GET_BY_ID: {NAME: "GET_COMMENT_BY_ID", method: "GET", url: "/e/comments/:commentId"}
    },
    PING: {NAME: "PING", method: "POST", url: "/u/ping" },
}

export default ENDPOINTS;