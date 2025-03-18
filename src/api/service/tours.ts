const API = 'http://localhost:5005/tours'

export const toursService = async () => {
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