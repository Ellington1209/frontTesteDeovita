import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Adicionando as regras da barra de rolagem para navegadores WebKit (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px !important; /* Largura da barra de rolagem */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #363636 !important; /* Cor da parte móvel da barra de rolagem */
  }

  /* Adicionando as regras da barra de rolagem para navegadores Firefox (Mozilla) */
  ::-moz-scrollbar {
    width: 8px; /* Largura da barra de rolagem */
  }

  ::-moz-scrollbar-thumb {
    background-color: #1C2335 !important;
  }

  /* Classe para remover bordas */
  * {
    border: none !important;
    outline: none !important; /* Isso remove a borda de foco também */
  }
`;

export default GlobalStyles;
