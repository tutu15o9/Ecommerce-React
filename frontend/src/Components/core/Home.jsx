import React from "react";
// import "../../styles.css";
// import { API } from "../../backend";
import Base from "./Base";
export default function Home() {
  return (
    <div>
      <Base title="Home Page" description="Welcome To the store">
        <div className="row">
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>

          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
        </div>
      </Base>
    </div>
  );
}
