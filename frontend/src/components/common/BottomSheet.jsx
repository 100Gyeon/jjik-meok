import styled from 'styled-components';
import { icDelete } from 'assets';

function BottomSheet({ closeModal, children }) {
  return (
    <>
      <StyledModalBackground />
      <StyledBottomSheet>
        <StyledBottomSheetHeader>
          <img src={icDelete} alt="x" onClick={closeModal} />
        </StyledBottomSheetHeader>
        <div>{children}</div>
      </StyledBottomSheet>
    </>
  );
}

export default BottomSheet;

const StyledModalBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 4rem);
  height: calc(100% + 4rem);
  background-color: #000;
  opacity: 0.5;
  z-index: 1;
`;

const StyledBottomSheet = styled.div`
  z-index: 2;
  position: fixed;
  margin-left: -2rem;
  width: min(42rem, 100%);
  height: fit-content;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  background-color: #fff;
`;

const StyledBottomSheetHeader = styled.div`
  height: 4.4rem;
  padding: 1.1rem 2.2rem 0.9rem 2.2rem;
  display: flex;
  align-items: center;

  & > img {
    cursor: pointer;
  }
`;
