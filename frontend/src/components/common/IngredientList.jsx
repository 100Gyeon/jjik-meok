import { useState } from 'react';
import styled from 'styled-components';
import UserChoice from './UserChoice';
import { icDelete } from 'assets';

function IngredientList({ list }) {
  const [finalList, setFinalList] = useState(list);

  return (
    <StyledIngredientList>
      <h2>내가 가진 재료</h2>
      {finalList.length > 0 && <h3>* 원하지 않거나 인식이 부정확한 재료는 x 버튼을 눌러 삭제할 수 있어요.</h3>}
      <ul>
        {finalList.length ? (
          finalList.map((item, idx) => (
            <li key={idx}>
              {item}
              <button
                onClick={() => {
                  const tempList = [...finalList];
                  tempList.splice(idx, 1);
                  setFinalList(tempList);
                }}
              />
            </li>
          ))
        ) : (
          <div>재료를 인식하지 못했어요</div>
        )}
      </ul>
      <UserChoice ingredientList={finalList} />
    </StyledIngredientList>
  );
}

export default IngredientList;

const StyledIngredientList = styled.div`
  border-top: 0.8rem solid #efefef;
  font-size: 1.6rem;

  h2 {
    margin-top: 2rem;
    font-size: 1.8rem;
    font-weight: 500;
  }

  h3 {
    font-size: 1.2rem;
    line-height: 2rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    word-break: keep-all;
    color: #939aa5;
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
      display: flex;
      align-items: center;

      button {
        width: 1.8rem;
        height: 1.8rem;
        background: no-repeat center/cover url(${icDelete});
        margin-left: 0.5rem;
      }
    }

    div {
      margin-top: 2rem;
    }
  }
`;
