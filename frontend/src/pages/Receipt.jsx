import { useState, useRef } from 'react';
import { HashLoader } from 'react-spinners';
import { createWorker } from 'tesseract.js';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import styled from 'styled-components';
import Header from 'components/common/Header';
import IngredientList from 'components/receipt/IngredientList';
import UserChoice from 'components/receipt/UserChoice';

function Receipt() {
  const worker = createWorker();
  const cropperRef = useRef(null);
  const [receiptImage, setReceiptImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [textResult, setTextResult] = useState('');
  const [loading, setLoading] = useState(false);

  const convertImageToText = async () => {
    if (!croppedImage) return;
    setLoading(true);
    await worker.load();
    await worker.loadLanguage('kor');
    await worker.initialize('kor');
    const { data } = await worker.recognize(croppedImage);
    setTextResult(data.lines);
    setLoading(false);
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <StyledReceipt>
      <Header />
      <h1>영수증에서 재료를 찾아볼까요?</h1>
      <input type="file" accept="image/*" onChange={(e) => setReceiptImage(URL.createObjectURL(e.target.files[0]))} />
      {receiptImage && <Cropper src={receiptImage} crop={onCrop} ref={cropperRef} />}
      {croppedImage && (
        <button onClick={() => convertImageToText()} disabled={loading}>
          재료 찾아내기
        </button>
      )}
      {loading ? (
        <StyledLoaderWrapper>
          <HashLoader color={'#3182f7'} />
        </StyledLoaderWrapper>
      ) : (
        textResult && (
          <>
            <IngredientList list={textResult} />
            <UserChoice />
          </>
        )
      )}
    </StyledReceipt>
  );
}

export default Receipt;

const StyledReceipt = styled.div`
  width: 100%;
  min-height: calc(100vh - 8rem);

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  & > img {
    width: 100%;
    margin-bottom: 2rem;
  }

  & > button {
    margin: 2rem 0;
    width: 100%;
    padding: 1.8rem 0;
    border-radius: 1.6rem;
    background-color: #3182f7;
    color: #fff;
    font-size: 1.4rem;
  }

  button:disabled {
    background-color: #c1d6f3;
  }
`;

const StyledLoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;
