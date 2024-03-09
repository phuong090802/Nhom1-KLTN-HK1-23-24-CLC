import { useQueryClient } from "@tanstack/react-query"

const useUser = () => {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData(['userData'])
    return user ? user : null
}

export default useUser