import { useEffect, useState } from 'react';
import styled from 'styled-components';

function IngredientList({ type, list }) {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (type === 'refrigerator') {
      setFilteredList(list.map((item) => item.className));
    } else if (type === 'receipt') {
      setFilteredList(
        list
          .map((item) => {
            return item.text.replace(/[^ㄱ-힣]/g, '');
          })
          .filter((item) => item.length !== 0),
      );
    }
  }, [list, type]);

  return (
    <StyledIngredientList>
      <h2>내가 가진 재료</h2>
      <ul>
        {filteredList.length ? (
          filteredList.map((item, idx) => <li key={idx}>{item}</li>)
        ) : (
          <div>재료를 인식하지 못했어요</div>
        )}
      </ul>
    </StyledIngredientList>
  );
}

export default IngredientList;

const StyledIngredientList = styled.div`
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
