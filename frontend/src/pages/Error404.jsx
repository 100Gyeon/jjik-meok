import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Error404() {
  return (
    <StyledError404>
      <div>
        <h1>404 Error</h1>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </div>
      <Link to="/">홈으로 돌아가기</Link>
    </StyledError404>
  );
}

export default Error404;

const StyledError404 = styled.div`
  position: relative;
  height: 100%;
  text-align: center;

  h1 {
    color: #3182f7;
    font-size: 3rem;
    margin-bottom: 3rem;
  }

  div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.4rem;
    line-height: 140%;
  }

  & > a,
  & > a:visited {
    position: absolute;
    bottom: 0;
    display: block;
    width: min(42rem, 100%);
    padding: 1.8rem 0;
    border-radius: 1.6rem;
    background-color: #3182f7;
    color: #fff;
    font-size: 1.4rem;
  }
`;
