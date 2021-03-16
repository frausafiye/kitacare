import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ManagerRegister() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phoneNumber: "",
    email: "",
    street: "",
    number: "",
    city: "",
    postcode: "",
    kgID: "",
    password: "",
    role: "Manager",
  });

  const submitForm = e => {
    e.preventDefault();
  };

  const grabValue = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>
          First Name
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            onChange={grabValue}
          />
        </label>
        <label>
          Last Name
          <input
            type='text'
            name='lastName'
            required
            placeholder='Last Name'
            onChange={grabValue}
          />
        </label>
        <label>
          Birthday
          <input
            type='date'
            name='birthday'
            placeholder='Birthday'
            onChange={grabValue}
          />
        </label>
        <label>
          Phone Number
          <input
            type='text'
            name='phoneNumber'
            placeholder='Phone Number'
            onChange={grabValue}
          />
        </label>
        <label>
          Email
          <input
            type='email'
            name='email'
            required
            placeholder='E-mail'
            onChange={grabValue}
          />
        </label>
        <label>
          Address
          <input
            type='text'
            name='street'
            placeholder='Street'
            onChange={grabValue}
          />
          <input
            type='text'
            name='number'
            placeholder='Number'
            onChange={grabValue}
          />
          <input
            type='text'
            name='city'
            placeholder='City'
            onChange={grabValue}
          />
        </label>
        <label>
          Kindergarten ID
          <input
            type='text'
            name='kgID'
            placeholder='Kindergarten ID'
            onChange={grabValue}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={grabValue}
          />
        </label>
        <input type='submit' value='Register' />
        <Link to='/'>
          <input type='submit' value='Cancel' />
        </Link>
      </form>
    </div>
  );
}
