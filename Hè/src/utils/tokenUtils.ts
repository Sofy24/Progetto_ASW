import axios from 'axios';

export async function verifyToken() : Promise<string> {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3000/user/verify', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }).then((response) => {
        //console.log("valid token"+response.data.email)
        resolve(response.data.email)
        }).catch((error) => {
        //console.log("wrong or expired token: "+ error)
        localStorage.removeItem('token');
        // Redirect to login
        reject(error)        
        })
    })
}

