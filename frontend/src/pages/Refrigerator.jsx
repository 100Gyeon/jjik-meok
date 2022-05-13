import React, { useState } from 'react';
import styled from 'styled-components';
import * as tmImage from '@teachablemachine/image';

function Refrigerator() {
  const URL = 'https://teachablemachine.withgoogle.com/models/N3-pwXGHa/';
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const predict = async () => {
    const model = await tmImage.load(modelURL, metadataURL);
    const tempImage = document.getElementById('userImage');
    const prediction = await model.predict(tempImage, false);

    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    setIngredientList(prediction.filter((ingredient) => ingredient.probability * 100 > 50));
    setLoading(false);
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    const targetFile = e.target.files[0];

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
      <h1>
        냉장고 안에 있는
        <br />
        재료를 찾아볼까요?
      </h1>
      <div>
        <input onChange={handleChange} type="file" accept="image/*" />
        {file && <StyledUserImage id="userImage" src={file} />}
      </div>
      {loading ? (
        <div>결과 로딩 중</div>
      ) : (
        <StyledResult>
          {ingredientList.map(({ className, probability }) => (
            <div key={className}>
              <span>{className}</span>
              <span>{`${(probability * 100).toFixed(1)}%`}</span>
            </div>
          ))}
        </StyledResult>
      )}
    </StyledRefrigerator>
  );
}

export default Refrigerator;

const StyledRefrigerator = styled.div`
  min-height: calc(100vh - 8rem);

  h1 {
    font-size: 2rem;
    line-height: 120%;
    margin-bottom: 2rem;
  }
`;

const StyledUserImage = styled.img`
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledResult = styled.div`
  font-size: 1.4rem;
  div + div {
    margin-top: 1rem;
  }
  span + span {
    margin-left: 0.5rem;
  }
`;
