import React from 'react';
import { Link } from 'react-router-dom';


export default function TempNav(props) {

  return (
    <div>
      <Link to={{
        pathname: "/profile",
        state: { referer: props.from }
      }}> Profile </Link>

      <Link to={{
        pathname: "/findBlerbers",
        state: { referer: props.from }
      }}> FindBlerbers </Link>

      {/* BIO */}
      <Link to={{
        pathname: "/bio",
        state: { referer: props.from }
      }}> bio </Link>

      {/* FOLLOWING  */}
      <Link

        to={{
          pathname: "/following",
          state: { referer: props.from }
        }}>
        Following
      </Link>
    </div>
  )
}