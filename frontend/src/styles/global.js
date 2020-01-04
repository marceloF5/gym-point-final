import { createGlobalStyle } from 'styled-components';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    * {
        box-sizing: border-box;
        margin:0;
        padding: 0;
        outline: 0
    }

    html, body, #root {
        height: 100%;
    }

    body {
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button {
        font: 16px Roboto, sans-serif;
    }

    input {
        color: #999999;
    }

    button {
        cursor: pointer;
    }
`;
