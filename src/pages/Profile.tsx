import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { motion, AnimatePresence } from "framer-motion"
import UserProfile from "../components/UserProfile.tsx"
const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#405DE6",
        },
        secondary: {
            main: "#E1306C",
        },
        background: {
            default: "#FAFAFA",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
})


const App: React.FC = () => {
    const initialUserInfo = {
        name: "Jane Doe",
        profilePicture: "https://images.unsplash.com/photo-1737625775722-9214c9cddf97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
        email: "jane@example.com",
        bio: "Full-stack developer passionate about creating user-friendly web applications.",
    }

    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <UserProfile initialUserInfo={initialUserInfo} />
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default App

