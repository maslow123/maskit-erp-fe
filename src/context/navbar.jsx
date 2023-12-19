'use client'
const { createContext } = require("react");

export const NavbarContext = createContext({
    navbar: {
        breadcrumbs: [],
        breadcrumbIcon: <></>,
        title: ""
    }, 
    setNavbar: (props) => {}
});