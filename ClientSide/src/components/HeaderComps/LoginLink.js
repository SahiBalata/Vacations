import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


function LoginLink(props)  {
   
        return (
          <button type="button" className="btn btn-warning" id="headerLogin" onClick={props.click}>Login</button>
        )
    
}

export default LoginLink;
