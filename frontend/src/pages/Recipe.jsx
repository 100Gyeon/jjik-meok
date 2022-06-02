import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/common/Header';
import { icNoImage } from 'assets';

function Recipe() {
  const location = useLocation();
  const [{ title, ingredient, step, image }] = location.state;
  const stepList = [];

  for (let i = 0; i < step.length; i++) {
    stepList.push({ step: step[i], image: image[i] });
  }

  return (
    <StyledRecipe>
      <Header />
      <h1>{title}</h1>
      <img src={image[image.length - 1]} />
      <h2>🥗 재료</h2>
      <StyledIngredient>{ingredient.join(', ')}</StyledIngredient>
      <h2>👩‍🍳 순서</h2>
      <StyledStep>
        {stepList.map(({ step, image }, idx) => (
          <div key={idx}>
            <p>
              {idx + 1}. {step}
            </p>
            <img src={image ?? icNoImage} />
          </div>
        ))}
      </StyledStep>
    </StyledRecipe>
  );
}

export default Recipe;

const StyledRecipe = styled.div`
  min-height: calc(100vh - 4rem);

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
    line-height: 140%;
    word-break: keep-all;
  }

  & > img {
    width: 100%;
    margin-bottom: 3rem;
  }

  h2 {
    width: 100%;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 500;
    border-bottom: 4px solid #efefef;
  }
`;

const StyledIngredient = styled.div`
  margin-bottom: 3rem;
  font-size: 1.4rem;
  line-height: 140%;
  word-break: keep-all;
`;

const StyledStep = styled.div`
  div {
    display: flex;
    width: 100%;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  p {
    flex: 1;
    font-size: 1.4rem;
    line-height: 160%;
    word-break: keep-all;
    display: flex;
    align-items: center;
  }

  img {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 1rem;
  }
`;
