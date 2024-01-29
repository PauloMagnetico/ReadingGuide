import { createContext, useState, useEffect, Context, ReactNode } from "react";

type NavigationContextType = {
    currentPath: string;
    navigate: (to: string) => void;
}

const NavigationContext: Context<NavigationContextType | undefined> = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
    children: ReactNode;
}

function NavigationProvider({ children }: NavigationProviderProps) {
    const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

    useEffect(() => {
        const handler = () => {
            setCurrentPath(window.location.pathname)
        };
        window.addEventListener('popstate', handler);

        //cleanup
        return () => {
            window.removeEventListener('popstate', handler)
        }
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    }


    return <NavigationContext.Provider value={{ currentPath, navigate }}>
        {children}
    </NavigationContext.Provider>
}

export { NavigationProvider, NavigationContext };
export type { NavigationContextType };

