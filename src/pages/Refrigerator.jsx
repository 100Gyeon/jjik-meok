import React, { useState } from 'react';
import styled from 'styled-components';
import * as tmImage from '@teachablemachine/image';
import { HashLoader } from 'react-spinners';
import Header from 'components/common/Header';
import IngredientList from 'components/common/IngredientList';

function Refrigerator() {
  const URL = 'https://teachablemachine.withgoogle.com/models/fzAZtIhe6/';
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const predict = async () => {
    const model = await tmImage.load(modelURL, metadataURL);
    const tempImage = document.getElementById('userImage');
    const prediction = await model.predict(tempImage, false);

    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    setIngredientList(prediction.filter((ingredient) => ingredient.probability * 100 >= 1));
    setIsDisabled(false);
    setLoading(false);
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    const targetFile = e.target.files[0];

    setIsDisabled(true);
    setLoading(true);
    setIngredientList([]);

    if (targetFile) {
      reader.onload = () => setFile(reader.result.toString());
      reader.readAsDataURL(targetFile);
      predict();
    }
  };

  return (
    <StyledRefrigerator>
      <Header />
      <h1>
        냉장고 안에 있는
        <br />
        재료를 찾아볼까요?
      </h1>
      <div>
        <StyledLabel htmlFor="refrigerator-input" isDisabled={isDisabled}>
          사진 가져오기
        </StyledLabel>
        <input
          type="file"
          id="refrigerator-input"
          accept="image/*"
          disabled={isDisabled}
          onChange={(e) => handleChange(e)}
        />
        {file && <img id="userImage" src={file} />}
      </div>
      {loading ? (
        <StyledLoaderWrapper>
          <HashLoader color={'#3182f7'} />
        </StyledLoaderWrapper>
      ) : (
        file && (
          <StyledResult>
            <IngredientList type="refrigerator" list={ingredientList.map((item) => item.className)} />
          </StyledResult>
        )
      )}
    </StyledRefrigerator>
  );
}

export default Refrigerator;

const StyledRefrigerator = styled.div`
  position: relative;
  min-height: calc(100vh - 4rem);

  h1 {
    font-size: 2rem;
    line-height: 140%;
    margin-bottom: 2rem;
  }

  input {
    display: none;
  }

  & > div > img {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin: 2rem 0;
  width: 100%;
  padding: 1.8rem 0;
  border-radius: 1.6rem;
  background-color: ${(props) => (props.isDisabled ? '#c1d6f3' : '#3182f7')};
  color: #fff;
  font-size: 1.4rem;
  text-align: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const StyledResult = styled.div`
  font-size: 1.6rem;

  & > div {
    margin-bottom: 1rem;
  }
`;

const StyledLoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;
