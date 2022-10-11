import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Login() {

  
    const [formData , setFormData] = useState({
    
        email: '',
        password:'',
      
    })
    const {name, email, password, password2} = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, message, isError} = useSelector((state) => state.auth)


    useEffect (() => {
        if (isError) {
            toast.error(message)
        }
        // redirect when logged in
        
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [dispatch, isError, isSuccess, message , navigate, user])
   

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
        
    }
    return (
      <>
          <section className="heading">
                <h1>
                    <FaSignInAlt/> Sign In
                </h1>
               
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
                
                <div className="form-group">
                    <input 
                    type="email" className="form-control"
                    id='email' 
                    value={email}
                    onChange={onChange}
                    name='email'
                    placeholder='Enter your email'
                    required/>
                
                </div>
                <div className="form-group">
                    <input 
                    type="password" className="form-control"
                    id='password' 
                    value={password}
                    onChange={onChange}
                    name='password'
                    placeholder='Enter your password'
                    required/>
                
                </div>
                
                <div className="form-group">
                    <button type='submit' className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
          </section>
      </>
    )
  }
  
  export default Login