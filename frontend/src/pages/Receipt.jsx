import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { createWorker } from 'tesseract.js';

function Receipt() {
  const worker = createWorker();
  const [receiptImage, setReceiptImage] = useState(null);
  const [textResult, setTextResult] = useState('');

  const convertImageToText = useCallback(async () => {
    if (!receiptImage) return;
    await worker.load();
    await worker.loadLanguage('kor');
    await worker.initialize('kor');
    const { data } = await worker.recognize(receiptImage);
    setTextResult(data.lines);
  }, [receiptImage, worker]);

  useEffect(() => {
    if (receiptImage) convertImageToText();
  }, [receiptImage]);

  const handleReceiptImage = (e) => {
    if (e.target.files[0]) {
      setReceiptImage(e.target.files[0]);
    } else {
      setReceiptImage(null);
      setTextResult('');
    }
  };

  return (
    <StyledReceipt>
      <h1>영수증에서 재료를 찾아볼까요?</h1>
      <input type="file" accept="image/*" onChange={handleReceiptImage} />
      <div>
        {receiptImage && <img src={URL.createObjectURL(receiptImage)} alt="영수증" />}
        {textResult &&
          textResult.map((line, idx) => {
            return <StyledResult key={idx}>{line.text}</StyledResult>;
          })}
      </div>
    </StyledReceipt>
  );
}

export default Receipt;

const StyledReceipt = styled.div`
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
`;

const StyledResult = styled.div`
  font-size: 1.4rem;
  line-height: 120%;
`;
