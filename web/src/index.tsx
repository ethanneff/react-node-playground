import "dotenv/config";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Navigation, Apollo } from "./providers";
import * as serviceWorker from "./serviceWorker";

const Root = () => {
  return (
    <StrictMode>
      <Apollo>
        <CssBaseline />
        <Navigation />
      </Apollo>
    </StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
