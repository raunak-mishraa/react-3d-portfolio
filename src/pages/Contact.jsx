import React from 'react'
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from '../components/Loader';
import  Fox  from '../models/Fox';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
const Contact = () => {
  const [form, setForm] = React.useState({name: '', email: '', message: ''});
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentAnimation, setCurrentAnimation] = React.useState('idle');
  const { alert, showAlert, hideAlert } = useAlert();
  const formRef = React.useRef(null);
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };
  const handleFocus = (e) => {
    setCurrentAnimation('walk');
  };
  const handleBlur = (e) => {
    setCurrentAnimation('idle');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');

      console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID)
      console.log(import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID)
      console.log(import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID);
      emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Raunak",
          from_email: form.email,
          to_email: "raunakmshraa.dev@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID
      ).then(() =>{
      setIsLoading(false);
      showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });
      
      setTimeout(()=>{
      hideAlert();
        setForm({name: '', email: '', message: ''});
          setCurrentAnimation('idle');
      
      },[3000]);
    }).catch((error)=>{
      setIsLoading(false);
      setCurrentAnimation('idle')
      console.log(error);
      showAlert({type: 'danger', message: 'Message sent successfully', show:true})
    })
  }; 
  return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
     {alert.show && <Alert {...alert} />}
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-14'>
          <label className='text-black-500 font-semibold'>
            Name
            <input type="text"
            name='name'
            className='input'
            placeholder='raunak'
            required
            value={form.name} 
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}/>
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input type="email"
            name='email'
            className='input'
            placeholder='raunak@gmail.com'
            required
            value={form.email} 
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}/>
          </label>
          <label className='text-black-500 font-semibold'>
           Your Message
            <textarea
            name='message'
            rows={4}
            className='textarea'
            placeholder='Let me know how can I help you'
            required
            value={form.message} 
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}/>
          </label>
          <button type='submit'
                  className='btn'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550] h-[350]'>
        <Canvas 
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}>
          <directionalLight intensity={2.5} position={[0,0,1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader/>}>
            <Fox 
            currentAnimation={currentAnimation}
            position={[0.5, 0.35, 0]}
            rotation={[12.6, -0.6, 0]}
            scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact