import React, { useState } from 'react';
import * as tmImage from '@teachablemachine/image';

function Home() {
  const URL = 'https://teachablemachine.withgoogle.com/models/N3-pwXGHa/';
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const predict = async () => {
    const model = await tmImage.load(modelURL, metadataURL);
    const tempImage = document.getElementById('userImage');
    const prediction = await model.predict(tempImage, false);

    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    setIngredientList(prediction);
    setLoading(false);
    setResult(prediction[0].className);
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    const targetFile = e.target.files[0];

    setLoading(true);
    setIngredientList([]);
    setResult('');

    if (targetFile) {
      reader.onload = () => setFile(reader.result.toString());
      reader.readAsDataURL(targetFile);
      predict();
    }
  };

  return (
    <div>
      <h1>냉장고 안에 있는 재료를 찾아볼까요?</h1>
      <div>
        <input onChange={handleChange} type="file" accept="image/*" />
        {file && <img id="userImage" src={file} />}
      </div>
      {loading && <div>결과 로딩 중</div>}
      {result && (
        <>
          <div>{ingredientList[0].className}</div>
          <div>{`${(ingredientList[0].probability * 100).toFixed(1)}%`}</div>
        </>
      )}
    </div>
  );
}

export default Home;
