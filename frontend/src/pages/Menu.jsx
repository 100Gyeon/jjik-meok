import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import Header from 'components/common/Header';
import BottomSheet from 'components/common/BottomSheet';
import recipe from 'assets/data/recipe';
import { icNoImage, lottieNoResult } from 'assets';

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
          {ingredientList.join(', ')}로 만들 수 있는 메뉴가 없어요.
          <Lottie animationData={lottieNoResult} />
        </StyledNoMenu>
      )}
      {isModalOpen && (
        <BottomSheet closeModal={() => setIsModalOpen(false)}>
          <StyledBottomSheetContent>
            <button onClick={() => setIsModalOpen(false)}>아니오</button>
            <a href="https://www.foodbank1377.org/donate/guide.do">기부할래요</a>
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
  font-size: 1.6rem;
  line-height: 160%;
`;

const StyledBottomSheetContent = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;

  button,
  a {
    width: calc(50% - 2rem);
    padding: 1.4rem 0;
    border-radius: 1.4rem;
    font-size: 1.4rem;
    line-height: 140%;
    text-align: center;
  }

  button {
    color: #575b5e;
    background-color: #e0e1e3;
  }

  a,
  a:visited {
    color: #fff;
    background-color: #3182f7;
  }
`;
