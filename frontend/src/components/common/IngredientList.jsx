import { icDelete } from 'assets';
import styled from 'styled-components';

function IngredientList({ list }) {
  return (
    <StyledIngredientList>
      <h2>내가 가진 재료</h2>
      <ul>
        {list.length ? (
          list.map((item, idx) => (
            <li key={idx}>
              {item}
              <button onClick={() => console.log('x')} />
            </li>
          ))
        ) : (
          <div>재료를 인식하지 못했어요</div>
        )}
      </ul>
      {list.length && <h3>* 원하지 않거나 인식이 부정확한 재료는 x 버튼을 눌러 삭제할 수 있어요.</h3>}
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

  h3 {
    font-size: 1.2rem;
    line-height: 2rem;
    margin-top: 3rem;
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
  }
`;
