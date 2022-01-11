import ReactDOM from "react-dom";
import Chess from "./lib/components/Chess";
import GlobalStyle from "./lib/styles/GlobalStyle";

ReactDOM.render(
  <>
    <GlobalStyle />
    <Chess />
  </>,
  document.getElementById("root")
);
