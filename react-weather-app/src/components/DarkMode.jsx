import { Switch } from "@mui/material";
import React, { useState } from "react";

export default function DarkMode() {
    const [theme, setTheme] = useState(false);
    const body = document.querySelector(".body");

    const handleTheme = () => {
        setTheme((theme) => !theme);

        return theme !== true
            ? body.classList.add("bg-slate-800")
            : body.classList.remove("bg-slate-800");
    };

    return (
        <div className="fixed bottom-5 left-5">
            <Switch
                onClick={handleTheme}
                className="theme-switch"
            />
        </div>
    );
}
