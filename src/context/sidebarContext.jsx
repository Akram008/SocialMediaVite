import { React, createContext, useContext, useState } from "react"

const SidebarContext = createContext() 

export const useSidebarToggle = () => useContext(SidebarContext)

export function SidebarProvider({children}){
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleSidebar = ()=>{
        setShowSidebar((prev) => !prev)
    }
    return(
        <SidebarContext.Provider value={{showSidebar, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}