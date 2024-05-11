import React from "react";
import { Container, StyledLink } from "./style";


function CardDashboard({ color, title, number, footerLabel, icon, to }) {
  return (

    <StyledLink to={to}>
      <Container color={color}>
        <span>{title}</span>
        <h1>
          <strong>total: </strong>
          {number}
        </h1>
        <small>{footerLabel}</small>
        <img src={icon} alt={title} />
      </Container>
    </StyledLink>

  );
}

export default CardDashboard;
