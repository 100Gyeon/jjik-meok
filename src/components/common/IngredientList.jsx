import { useState } from 'react';
import styled from 'styled-components';
import UserChoice from './UserChoice';
import BottomSheet from './BottomSheet';
import { icDelete, icHands } from 'assets';

function IngredientList({ list }) {
  const [finalList, setFinalList] = useState(list);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledIngredientList>
      <h2>내가 가진 재료</h2>
      {finalList.length > 0 && <h3>원하지 않거나 인식이 부정확한 재료는 x 버튼을 눌러 삭제할 수 있어요.</h3>}
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
      {finalList.length > 0 && <UserChoice ingredientList={finalList} setIsModalOpen={setIsModalOpen} />}
      {isModalOpen && (
        <BottomSheet closeModal={() => setIsModalOpen(false)}>
          <StyledBottomSheetContent>
            다양한 요인으로 인해
            <br />
            재료를 제대로 인식하지 못할 수 있어요.
            <img src={icHands} />
            <div>
              <span>
                한 번에 인식하려는 재료가 너무 많지 않은지,
                <br />
                사진이 흔들리지 않았는지
              </span>
              <br />
              확인 후 다시 시도해 주세요.
            </div>
          </StyledBottomSheetContent>
        </BottomSheet>
      )}
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

const StyledBottomSheetContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  line-height: 140%;
  font-size: 1.8rem;
  font-weight: 500;

  img {
    display: block;
    margin: 0 auto;
    width: 20rem;
  }

  & > div {
    font-size: 1.4rem;
    line-height: 140%;
    word-break: keep-all;
    margin-bottom: 2rem;

    span {
      color: #3182f7;
      font-weight: 500;
    }
  }
`;
