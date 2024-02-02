import React, { Component } from 'react'
import loading from './loading.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className="text-center" style={{display:"flex",justifyContent:"center"}}>
        <img src={loading} alt="loading" ></img>
      </div>
    )
  }
}

export default Spinner
