import React from "react";

export const CustomContext = React.createContext();
export function editDataReducer(state, { value, type }) {
    switch (type) {
        case "change":
            return {
                ...state,
                ...value,
            };

        default:
            throw new Error();
    }
}
