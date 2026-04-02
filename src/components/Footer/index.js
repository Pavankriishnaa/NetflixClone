import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div style={{display: 'flex', gap: '20px'}}>
          <FaGoogle size={25} />
          <FaTwitter size={25} />
          <FaInstagram size={25} />
          <FaYoutube size={25} />
        </div>
        <p>Contact us</p>
      </div>
    )
  }
}

export default Footer
