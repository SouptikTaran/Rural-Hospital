import { redirect } from "react-router-dom";
import Cookies from 'js-cookie';

export function tokenLoader() {
    const token = Cookies.get('token');
    if (!token) return null;
    
    return token;
}

export function checkToken() {
    const token = tokenLoader()
    if (!token) {
        return redirect('/login');  // Return the redirect action
    }

    return null;
}

export function restrict(){
    const token = tokenLoader() 
    if(token) return redirect('/dashboard')
    return null ;
}


export function logoutFunc(){
    Cookies.remove('token')
    return redirect('/login')
}