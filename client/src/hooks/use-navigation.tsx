import { useContext } from "react";
import { NavigationContext } from "../context/Navigation";
import type { NavigationContextType } from "../context/Navigation";

function useNavigation(): NavigationContextType {
    const context = useContext(NavigationContext);

    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider')
    }

    return context;
}

export default useNavigation;