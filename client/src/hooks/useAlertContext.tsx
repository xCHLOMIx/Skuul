import { useContext } from "react";
import { AlertContext } from "../context/universal/AlertContext";

export const useAlertContext = () => {
    const context = useContext(AlertContext)

    if (!context) {
        throw Error("useAlertContext must be used inside the AlertContextProvider")
    }

    return context
}