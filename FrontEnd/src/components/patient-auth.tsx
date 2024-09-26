import { useState } from "react"
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

import axios from 'axios';
import { useNavigate } from "react-router-dom"
axios.defaults.withCredentials = true;


const errorNoti = (msg) => {
  toast.error(msg, {
    style: {
      border: '1px solid #FF0000',
      padding: '16px',
      color: '#FFFFFF',
      backgroundColor: '#FF0000',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#FFFFFF',
      secondary: '#FF0000',
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const successNoti = (msg: any) => {
  toast.success(msg, {
    style: {
      border: '1px solid #00FF00',
      padding: '16px',
      color: '#FFFFFF',
      backgroundColor: '#00FF00',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#FFFFFF',
      secondary: '#00FF00',
    },
  });
}


export function PatientAuthComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupFirstName, setSignupFirstName] = useState("")
  const [signupLastName, setSignupLastName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupGender, setSignupGender] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    // console.log("Login:", { email: loginEmail, password: loginPassword })

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: loginEmail,
        password: loginPassword,
      })

      console.log(response)

      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          Cookies.set("token", token, {
            expires: 7,
            secure: true,
            sameSite: "None",
          });
          successNoti(response.data.message);
          navigate("/dashboard");
        }
      } else {
        errorNoti("Error occurred during signup");
      }


    } catch (error) {
      if (error.response && error.response.data) {
        errorNoti(error.response.data.error || "Error occurred during Login");
      } else {
        errorNoti("Error occurred during signup");
      }
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        firstName: signupFirstName,
        lastName: signupLastName,
        email: signupEmail,
        gender: signupGender,
        password: signupPassword,
      });
      if (response.status == 201) {
        const token = response.data.token;
        if (token) {
          Cookies.set("token", token, {
            expires: 7,
            secure: true,
            sameSite: "None",
          });
          successNoti("Successfully signed up");
          navigate("/details");
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        errorNoti(error.response.data.error || "Error occurred during signup");
      } else {
        errorNoti("Error occurred during signup");
      }
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Rural Healthcare System</CardTitle>
          <CardDescription className="text-center">Login or create an account to access healthcare services</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="pl-10 pr-10"
                    />
                    <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-first-name">First Name</Label>
                  <div className="relative">
                    <Input
                      id="signup-first-name"
                      type="text"
                      placeholder="Enter your first name"
                      value={signupFirstName}
                      onChange={(e) => setSignupFirstName(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-last-name">Last Name</Label>
                  <div className="relative">
                    <Input
                      id="signup-last-name"
                      type="text"
                      placeholder="Enter your last name"
                      value={signupLastName}
                      onChange={(e) => setSignupLastName(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup value={signupGender} onValueChange={setSignupGender} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="Male" />
                      <Label htmlFor="Male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="Female" />
                      <Label htmlFor="Female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="Other" />
                      <Label htmlFor="Other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="pl-10 pr-10"
                    />
                    <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            By logging in or signing up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}