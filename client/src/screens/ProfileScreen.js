import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'


const ProfileScreen = ({location, history}) => {

  const [name, setName] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setPhoneNumber(user.phone_number)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
      setMessage('Password do not match')
    } else {
      //dispatch update profile
      dispatch(updateUserProfile({
        id: user._id,
        name, email, phone_number, password
      }))
    }

   //dispatch register
  }
  return <Row>
    <Col md={3}>
    <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated!</Message>}
      {loading && <Loader />}
    <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
          <Form.Label>Full Name:</Form.Label>
          <Form.Control type='name' 
          placeholder='Enter Name' 
          value={name}
          onChange={(e) => setName(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId='phone_number'>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type='phone_number' 
          placeholder='Enter Phone No.' 
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}>

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' value={email}
          onChange={(e) => setEmail(e.target.value)}>

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' value={password}
          onChange={(e) => setPassword(e.target.value)}>
            
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}>
            
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update Profile
        </Button>
      </Form>
    </Col>
    <Col md={9}>
      <h2>My Orders</h2>
    </Col>
  </Row>
}

export default ProfileScreen