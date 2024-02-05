import { useEffect, useState } from "react"
import { authSocket } from "../socket/guest/authorSocket"

const useAuthorSocket = () => {
    const [connected, setConnected] = useState(authSocket.connected)
    useEffect(() => {
        if (!connected) {
            authSocket.connect()
        }
    }, [connected])

    useEffect(() => {
        const onConnect = () => {
            setConnected(true)
        }

        const onDisconnect = () => {
            setConnected(false)
        }

        authSocket.on('connect', onConnect);
        authSocket.on('disconnect', onDisconnect)

        return () => {
            authSocket.off('connect', onConnect);
            authSocket.off('disconnect', onDisconnect)
        }
    }, [])

    return {
        connected,
        setConnected,
        authSocket
    };
}

export default useAuthorSocket