import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {
    const [formData , setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2 : '',
    })
    const {name, email, password, password2} = formData
    const dispatch = useDispatch()

    const {user, isLoading, isSuccess, message, isError} = useSelector((state) => state.auth)
const navigate = useNavigate()
    useEffect(() => {
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
        if (password !== password2) {
            toast.error('Passwords do not match')
        }else{
            const userData = {
                name,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }
    if (isLoading) {
        return <Spinner/>
    }
    return (
      <>
          <section className="heading">
                <h1>
                    <FaUser/> Register 
                </h1>
                <p>Please create an account</p>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                    type="text" className="form-control"
                    id='name' 
                    value={name}
                    onChange={onChange}
                    name='name'
                    placeholder='Enter your name'
                    required/>
                
                </div>
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
                    <input 
                    type="password" className="form-control"
                    id='password2' 
                    value={password2}
                    onChange={onChange}
                    name='password2'
                    placeholder='Confirm password'
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
  
  export default Register