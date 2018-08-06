import React from 'react';
import pages from '../data/pages'

const Navbar = ({ changePage }) => 
 
  <div className="container" id="gmg-header">
    <div id="gmg-masthead">
      <a href="#">
        <img src="img/gold-mountain-gallery.jpg" alt="Gold Mountain Gallery" className="img-responsive" />
      </a>
    </div>
    <button className="navbar-toggle" data-toggle="collapse" data-target="#gmg-nav">Open Close</button>
    
    <nav className="collapsed navbar-collapse" id="gmg-nav" role="navigation">
    
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#">About</a>
          <ul className="dropdown-menu">
            <li><a href="#">Our Artists</a></li>
            <li><a href="#">Our Mission</a></li>
          </ul>
        </li>  
        <li className="dropdown">
          <a href="#">Beautiful Things</a>
          <ul className="dropdown-menu">
            <li><a href="#">Fine Artwork</a></li>
            <li><a href="#">Jewelry</a></li>
             <li><a href="#">Lighting</a></li>
            <li><a href="#">Photography</a></li>
            <li><a href="#">Woodworking</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Events</a>
        </li>
        <li>
          <a href="#">Get In Touch</a>
        </li>
      </ul>
  
    </nav>
  </div>
   
    
export default Navbar;
