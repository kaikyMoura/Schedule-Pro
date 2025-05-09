
"use client"
import { useTheme } from "@/contexts/ThemeContext/useTheme"
import { useEffect } from "react"
import { AiFillMoon } from "react-icons/ai"
import { MdWbSunny } from "react-icons/md"
import styles from "./ThemeSwitcher.module.scss"

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme()

    useEffect(() => { }, [theme, toggleTheme])

    return (
        <div className="">
            <div
                className={`${styles.switch} ${theme === "dark" ? styles.dark : styles.light}`}
                onClick={toggleTheme}
            >
                <div className={styles.slider}>
                    <div className={styles.icon}>
                        {theme === "dark" ? (
                            <>
                                <AiFillMoon className={styles.moon} />
                            </>
                        ) : (
                            <MdWbSunny className={styles.sun} />
                        )}
                    </div>
                    <div className={styles.circle}></div>
                </div>
            </div>
        </div>
    )
}

export default ThemeSwitcher