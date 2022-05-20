import styled from 'styled-components';

function Ingredient({ list }) {
  const reg = /[^ㄱ-힣]/g;
  const filteredList = list
    .map((item) => {
      return item.text.replace(reg, '');
    })
    .filter((item) => item.length !== 0);

  return (
    <StyledIngredient>
      <h2>내가 가진 재료</h2>
      <ul>
        {filteredList.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </StyledIngredient>
  );
}

export default Ingredient;

const StyledIngredient = styled.div`
  border-top: 0.8rem solid #efefef;
  font-size: 1.6rem;

  h2 {
    padding: 2rem 0;
    font-size: 1.8rem;
    font-weight: 500;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    li {
      background-color: #f2f3f5;
      border-radius: 2rem;
      padding: 1rem;
      font-size: 1.4rem;
      line-height: 1.4rem;
    }
  }
`;