// import React from "react"
import { BulletList } from 'react-content-loader';
// npm i react-content-loadery

const Loader = ({ props }) => (
  <BulletList
    height={140}
    speed={1}
    backgroundColor={'#829aec'}
    foregroundColor={'#4757d1'}
    viewBox="0 0 380 70"
  ></BulletList>
);

export default Loader;
