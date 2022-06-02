import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/common/Header';
import recipe from 'assets/data/recipe';
import { icNoImage } from 'assets';

function Menu() {
  const location = useLocation();
  const { ingredientList } = location.state;
  console.log(ingredientList);

  return (
    <StyledMenu>
      <Header />
      <h1>
        내가 가진 재료로
        <br />
        이런 메뉴들을 만들 수 있어요
      </h1>
      <StyledImgList>
        {recipe.map(({ id, image, title, ingredient }) => (
          <li key={id}>
            <img src={image[image.length - 1] ?? icNoImage} />
            <div>
              <div>
                <span>[ 추천 레시피 ]</span>
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
    </StyledMenu>
  );
}

export default Menu;

const StyledMenu = styled.div`
  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
    line-height: 140%;
  }
`;

const StyledImgList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  word-break: keep-all;

  li {
    width: calc(50% - 1rem);
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
