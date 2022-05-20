import { icArrowRight, icEyes, icHit } from 'assets';
import styled from 'styled-components';

function UserChoice() {
  return (
    <StyledUserChoice>
      <div>
        <div>
          <img src={icEyes} />
        </div>
        <div>재료가 정확하지 않아요.</div>
        <img src={icArrowRight} />
      </div>
      <div>
        <div>
          <img src={icHit} />
        </div>
        <div>레시피 추천받으러 갈래요.</div>
        <img src={icArrowRight} />
      </div>
    </StyledUserChoice>
  );
}

export default UserChoice;

const StyledUserChoice = styled.div`
  border-top: 0.5rem solid #efefef;
  margin-top: 2rem;
  font-size: 1.6rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 2rem;

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
