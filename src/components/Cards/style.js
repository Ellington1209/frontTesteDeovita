import styled from "styled-components";
import { Link } from "react-router-dom";

// Estilize o Link para remover a linha de sublinhado
export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Container = styled.div`
  width: 100%;
  height: 130px;

  cursor: pointer;

  margin: 10px 0;

  background-color: ${(props) => props.color};
  color: #eeeeee;

  border-radius: 7px;
  padding: 10px 20px;

  /* Remova a linha de sublinhado */
  text-decoration: none;

  position: relative;
  overflow: hidden;

  > img {
    height: 110%;

    position: absolute;
    top: -10px;
    right: -30px;

    opacity: 0.5;
  }

  > span {
    font-size: 18px;
    font-weight: 500;
  }

  > small {
    font-size: 18px;
    position: absolute;
    bottom: 10px;
  }

  @media (max-width: 770px) {
    > span {
      font-size: 14px;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 22px;

      strong {
        display: inline-block;
        width: 100%;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 420px) {
    width: 100%;

    > h1 {
      display: flex;

      strong {
        position: initial;
        width: auto;
        font-size: 22px;
      }

      strong:after {
        display: inline-block;
        content: "";
        width: 1px;
      }
    }
  }
`;
