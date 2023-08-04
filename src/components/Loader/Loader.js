// import React from "react"
import { BulletList } from 'react-content-loader';
// npm i react-content-loadery

const Loader = ({ props }) => (
  <BulletList
    height={300}
    speed={1}
    backgroundColor={'#829aec'}
    foregroundColor={'#4757d1'}
    viewBox="0 0 500 70"
  ></BulletList>
);

export default Loader;
