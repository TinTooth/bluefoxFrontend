import useAuth from "./useAuth";

const useConfig = () => {
    const [user,token] = useAuth()
    const config = {headers:{Authorization: `Bearer ${token}`}}

    return config ;
}
 
export default useConfig