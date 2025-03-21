const API = 'http://localhost:5005/users'

export const usersService = async () => {
    try {
        const response = await fetch(API)
        if(!response.ok){
            throw new Error('Failed')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log((error as Error).message);
        
    }
}