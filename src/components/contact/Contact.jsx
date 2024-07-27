import React, { useState } from "react";
import Back from "../common/back/Back";
import "./contact.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const customToastStyle = {
      backgroundColor: '#1EB2A6',
      color: 'white',
      fontSize: '16px',
    };

    const formData = {
      name,
      email,
      subject,
      message,
      access_key: "bfbd3e2d-da01-43c1-9f0d-1a2daae0223d",
    };

    const json = JSON.stringify(formData);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        alert('success')
        setTimeout(()=>{
          toast.success('Message sent successfully!', {
            style: customToastStyle
          });
        }, 1000);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        style: customToastStyle
      });
    }
  };

  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5022488362447!2d30.090287973116276!3d-1.9523517367129641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6f3a8b412f9%3A0x595bcaf36fbdffe7!2sALU%20School%20of%20Business!5e0!3m2!1sen!2srw!4v1722077657228!5m2!1sen!2srw';

  return (
    <>
      <Back title='Contact us' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map} width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          </div>
          <div className='right row'>
            <h1>Contact us</h1>
            <p>We are open for any suggestion or just to have a chat</p>

            <div className='items grid2'>
              <div className='box'>
                <h4>ADDRESS:</h4>
                <p>198 West 21th Street, Suite 721 New York NY 10016</p>
              </div>
              <div className='box'>
                <h4>EMAIL:</h4>
                <p> info@yoursite.com</p>
              </div>
              <div className='box'>
                <h4>PHONE:</h4>
                <p> + 1235 2355 98</p>
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className='flexSB'>
                <input 
                  type='text' 
                  placeholder='Name' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
                <input 
                  type='email' 
                  placeholder='Email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <input 
                type='text' 
                placeholder='Subject' 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
              />
              <textarea 
                cols='30' 
                rows='10' 
                placeholder='Create a message here...' 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className='primary-btn' type='submit'>SEND MESSAGE</button>
            </form>

            <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default Contact;
