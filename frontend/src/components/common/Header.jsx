import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { icArrowLeft } from 'assets';

function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <button onClick={() => navigate(-1)}>
        <img src={icArrowLeft} alt="<" />
      </button>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.div`
  margin-bottom: 2rem;
`;
