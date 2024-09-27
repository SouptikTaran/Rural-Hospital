import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
export function LogOutButton(){  
  const navigate = useNavigate();
    const handleLogout=()=>{ 
          navigate('/logout');
    }
  return (
    <>
        <button className="border p-2 rounded-md border-gray-300 text-[#44457d]" onClick={handleLogout} >
            <LogOut className="stroke-[0.1rem] h-4 w-4" />
        </button>
    </>
    
  )
}
