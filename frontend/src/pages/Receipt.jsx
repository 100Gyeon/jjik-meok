import { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import styled from 'styled-components';

function Receipt() {
  const worker = createWorker();
  const cropperRef = useRef(null);
  const [receiptImage, setReceiptImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [textResult, setTextResult] = useState('');

  const convertImageToText = async () => {
    if (!croppedImage) return;
    await worker.load();
    await worker.loadLanguage('kor');
    await worker.initialize('kor');
    const { data } = await worker.recognize(croppedImage);
    setTextResult(data.lines);
  };

  const handleReceiptImage = (e) => {
    if (e.target.files[0]) {
      setReceiptImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setReceiptImage(null);
      setTextResult('');
    }
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <StyledReceipt>
      <h1>영수증에서 재료를 찾아볼까요?</h1>
      <input type="file" accept="image/*" onChange={(e) => handleReceiptImage(e)} />
      {receiptImage && <Cropper src={receiptImage} crop={onCrop} ref={cropperRef} />}
      {croppedImage && <button onClick={() => convertImageToText()}>이미지 자르기</button>}
      {textResult &&
        textResult.map((line, idx) => {
          return <StyledResult key={idx}>{line.text.replace(/[0-9]/g, '').replace(/\s/g, '')}</StyledResult>;
        })}
    </StyledReceipt>
  );
}

export default Receipt;

const StyledReceipt = styled.div`
  width: 100%;
  min-height: calc(100vh - 8rem);

  h1 {
    font-size: 2rem;
    line-height: 120%;
    margin-bottom: 2rem;
  }

  img {
    width: 100%;
    margin-bottom: 2rem;
  }

  button {
    margin: 2rem 0;
    width: 100%;
    padding: 1.8rem 0;
    border-radius: 1.6rem;
    background-color: #0064ff;
    color: #fff;
    font-size: 1.4rem;
  }
`;

const StyledResult = styled.div`
  font-size: 1.4rem;
  line-height: 120%;
`;
