import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { lottieChoice, icReceipt, icRefrigerator } from 'assets';

function Home() {
  return (
    <StyledHome>
      <StyledDescription>
        어떤 사진을 업로드해서
        <br />
        내가 가진 재료를 인식할까요?
      </StyledDescription>
      <Lottie animationData={lottieChoice} />
      <StyledLinkContainer>
        <StyledLink to="/refrigerator">
          <img src={icRefrigerator} />
          <div>냉장고</div>
        </StyledLink>
        <StyledLink to="/receipt">
          <img src={icReceipt} />
          <div>영수증</div>
        </StyledLink>
      </StyledLinkContainer>
    </StyledHome>
  );
}

export default Home;

const StyledHome = styled.div`
  margin: 0 auto;
  word-break: keep-all;
`;

const StyledDescription = styled.h1`
  margin-top: 2rem;
  font-size: 2rem;
  line-height: 140%;
  text-align: center;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  & > a {
    font-size: 1.6rem;
    width: 100%;
    padding: 1.5rem 1rem;
    border-radius: 1rem;
  }

  & > a:first-of-type {
    background-color: #dde6f4;
    color: #2f7ded;
  }

  & > a:last-of-type {
    background-color: #2f7ded;
    color: white;
  }
`;

const StyledLink = styled(Link)`
  width: fit-content;
  padding: 2rem;
  border-radius: 1rem;

  &:first-of-type {
    background-color: #dde6f4;
    color: #2f7ded;
  }

  &:last-of-type {
    background-color: #2f7ded;
    color: white;
  }

  img {
    width: 6rem;
    height: 6rem;
  }

  div {
    text-align: right;
    padding-right: 1rem;
    font-size: 1.6rem;
  }
`;
