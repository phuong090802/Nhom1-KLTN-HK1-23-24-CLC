import { useQueryClient } from "@tanstack/react-query"

const useUserData = () => {
    const queryClient = useQueryClient()
    return queryClient.getQueryData(['userData'])
}

export default useUserData