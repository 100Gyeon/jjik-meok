import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { icArrowRight, icEyes, icHit } from 'assets';

function UserChoice({ ingredientList }) {
  return (
    <StyledUserChoice>
      <div>
        <div>
          <img src={icEyes} />
        </div>
        <div>재료 인식이 정확하지 않아요</div>
        <img src={icArrowRight} />
      </div>
      <Link to="/menu" state={{ ingredientList }}>
        <div>
          <img src={icHit} />
        </div>
        <div>메뉴 추천받고 레시피 볼래요</div>
        <img src={icArrowRight} />
      </Link>
    </StyledUserChoice>
  );
}

export default UserChoice;

const StyledUserChoice = styled.div`
  border-top: 0.8rem solid #efefef;
  margin-top: 2rem;
  font-size: 1.6rem;

  & > div {
    cursor: pointer;
  }

  & > div,
  & > a {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;

    div:first-child {
      border-radius: 0.8rem;
      border: 0.1rem solid #efefef;
      padding: 1rem;
    }

    div:nth-child(2) {
      flex: 1;
    }

    img {
      width: 2rem;
      height: 2rem;
      object-fit: contain;
    }
  }
`;
