import React, {useEffect, useState} from 'react';

import logo from '@assets/logo.png';
import mapPoint from "@assets/mapPoint.png";
import arrow from "@assets/arrow.png";
import {Link} from 'react-router-dom';
//styled
import Wrapper from './styled/Wrapper';
import Main from './styled/Main';
// import InputWrapper from  './styled/InputWrapper';
// import Input from './styled/Input';
// import Select from './styled/Select';
import LogoImg from './styled/LogoImg';
//components
import Input from "../Input/Input";
import HeaderBurger from './components/HeaderBurger';
import HeaderConnect from './components/HeaderConnect';
import EntryModal from './components/EntryModal.jsx';
const MobileHeader = (props) => {
  return (
    <Wrapper>
      <Main>
        <HeaderBurger/>
        <LogoImg src={logo} className="header__logo"/>
        <Input/>
        <HeaderConnect/>
      </Main>
    </Wrapper>
  );
}

const DesktopHeader = (props) => {
  const [entry, setEntry] = useState(null);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    let scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    setScroll(scrollTop)
    document.addEventListener('scroll', (event) => {
      let scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      setScroll(scrollTop)
    })
  }, [])
  return (
    <Wrapper>
      <EntryModal entry={entry} setEntry={setEntry}/>
      <Main>
        <HeaderBurger/>
        <Link to='/main'>
          <LogoImg src={logo} className="header__logo"/>
        </Link>
        {/* {(scroll >= 400 || (props.location && props.location.pathname !== "/main") || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)  ) && */}
          <Input/>
        {/* } */}
        <HeaderConnect setEntry={setEntry}/>
      </Main>
    </Wrapper>
  );
}

export {MobileHeader, DesktopHeader};
