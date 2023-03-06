import styled from "@emotion/styled";
import { Common } from "./Common";

export const Banner = styled.div`
  height: 10rem;
  color: ${Common.colors.lightGray01};
  background: linear-gradient(
    to bottom,
    ${Common.colors.mainColor02},
    ${Common.colors.lavender01}
  );

  .banner1 {
    height: 100%;
  }

  .banner2 {
    height: 100%;
  }
`;
