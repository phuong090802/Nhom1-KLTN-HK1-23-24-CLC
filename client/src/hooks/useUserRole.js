import { useQueryClient } from "@tanstack/react-query"

const useUser = () => {
    const queryClient = useQueryClient()
    const userData = queryClient.getQueryData(['userData'])
    return userData ? userData : null
}

export default useUser