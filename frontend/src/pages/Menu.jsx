import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import Header from 'components/common/Header';
import BottomSheet from 'components/common/BottomSheet';
import recipe from 'assets/data/recipe';
import { icFood, icNoImage, lottieNoResult } from 'assets';

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ingredientList } = location.state;
  const [searchedList, setSearchedList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    ingredientList.forEach((element) => {
      setSearchedList(recipe.filter((item) => item.ingredient.includes(element)));
    });
  }, []);

  return (
    <StyledMenu>
      <Header />
      <h1>재료 기반 메뉴 추천</h1>
      {searchedList.length ? (
        <>
          <StyledImgList>
            {searchedList.map(({ id, image, title, ingredient }) => (
              <li
                key={id}
                onClick={() => navigate(`recipe/${id}`, { state: searchedList.filter((item) => item.id === id) })}>
                <img src={image[image.length - 1] ?? icNoImage} />
                <div>
                  <div>
                    <span>[ 관련 레시피 ]</span>
                    <br />
                    {title}
                  </div>
                  <div>
                    <span>[ 재료 ]</span>
                    <br />
                    <StyledInformation>{ingredient.join(', ')}</StyledInformation>
                  </div>
                </div>
              </li>
            ))}
          </StyledImgList>
          <button onClick={() => setIsModalOpen(true)}>마음에 드는 메뉴가 없나요?</button>
        </>
      ) : (
        <StyledNoMenu>
          인식한 재료를 활용해
          <br />
          만들 수 있는 메뉴가 없어요.
          <Lottie animationData={lottieNoResult} />
        </StyledNoMenu>
      )}
      {isModalOpen && (
        <BottomSheet closeModal={() => setIsModalOpen(false)}>
          <StyledBottomSheetContent>
            <h2>
              지금 나에게 필요 없는 식재료,
              <br />
              누군가에게는 도움이 될 수 있습니다.
            </h2>
            <div>
              <span>푸드뱅크</span>는 잉여식품을 기부받아 결식아동, 독거노인 등 저소득 소외계층에게 제공하고 있습니다.{' '}
              <span>식재료를 기부</span>하고 이웃, 환경 사랑을 실천해 볼까요?
              <img src={icFood} />
            </div>
            <StyledButtonContainer>
              <button onClick={() => setIsModalOpen(false)}>괜찮아요</button>
              <a href="https://www.foodbank1377.org/donate/guide.do">기부할래요</a>
            </StyledButtonContainer>
          </StyledBottomSheetContent>
        </BottomSheet>
      )}
    </StyledMenu>
  );
}

export default Menu;

const StyledMenu = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 4rem);

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
    line-height: 140%;
  }

  & > button {
    width: 100%;
    margin-top: 4rem;
    margin-bottom: 2rem;
    padding: 1.8rem 0;
    border-radius: 1.6rem;
    background-color: #3182f7;
    color: #fff;
    font-size: 1.4rem;
  }
`;

const StyledImgList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  word-break: keep-all;

  li {
    width: calc(50% - 1rem);
    cursor: pointer;
    border-radius: 1rem;
    box-shadow: 0.4rem 0.4rem 2rem rgba(0, 0, 0, 0.15);

    img {
      width: 100%;
      height: 15rem;
      object-fit: cover;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }

    & > div {
      padding: 1rem;
      font-size: 1.4rem;
      line-height: 140%;
      overflow: hidden;

      div:last-child {
        margin-top: 1rem;
      }

      div > span:first-child {
        color: #939aa5;
        font-size: 1.2rem;
      }
    }
  }
`;

const StyledInformation = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledNoMenu = styled.div`
  width: 100%;
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.6rem;
  line-height: 160%;
`;

const StyledBottomSheetContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    line-height: 140%;
    font-size: 1.8rem;
    font-weight: 500;
  }

  div {
    font-size: 1.4rem;
    line-height: 140%;
    word-break: keep-all;

    span {
      color: #3182f7;
      font-weight: 500;
    }

    img {
      display: block;
      margin: 0 auto;
      width: 20rem;
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button,
  a {
    width: calc(50% - 2rem);
    padding: 1.4rem 0;
    border-radius: 1.4rem;
    font-size: 1.4rem;
    line-height: 140%;
  }

  button {
    color: #575b5e;
    background-color: #e0e1e3;
    margin-right: 2rem;
  }

  a,
  a:visited {
    color: #fff;
    background-color: #3182f7;
    text-align: center;
  }
`;
