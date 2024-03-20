
import React from "react";
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
const App = () => {
  
  React.useEffect(() => {
    document.title = "Exclusive Elements";
  }, []);
  return <h1>Exclusive Elements</h1>;
  
};
export default App;
