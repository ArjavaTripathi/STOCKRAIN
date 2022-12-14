import React from "react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import "./Header.css";
import Logo from './StockFinal.svg'
import Signup from './signup.js'

function Header() {
  return (
    <nav class="navbar">
      <div class="navbar__container">
      <div className="header__logo">
        <img src={Logo} width={110} height={80}/>
      </div>
        <div class="navbar__toggle" id="mobile-menu">
          <span class="bar"></span> <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <ul class="navbar__menu">
          <li class="navbar__item">
            <a href="/" class="navbar__links" id="home-page">Portfolio</a>
          </li>
          <li class="navbar__item">
            <a href="market.html" class="navbar__links" id="about-page">Market</a>
          </li>
          <li class="navbar__item">
            <a href="bank.html" class="navbar__links" id="services-page">Bank</a>
          </li>
          <li class="navbar__btn">
            <a href="#" class="button" id="signup">Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
