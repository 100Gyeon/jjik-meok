import { useState, useCallback, useEffect } from 'react';
import { createWorker } from 'tesseract.js';

function Receipt() {
  const worker = createWorker();
  const [receiptImage, setReceiptImage] = useState(null);
  const [textResult, setTextResult] = useState('');

  const convertImageToText = useCallback(async () => {
    if (!receiptImage) return;
    await worker.load();
    await worker.loadLanguage('eng+kor');
    await worker.initialize('eng+kor');
    const { data } = await worker.recognize(receiptImage);
    setTextResult(data.lines);
  }, [receiptImage, worker]);

  useEffect(() => {
    if (receiptImage) {
      convertImageToText();
    }
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
    <div>
      <h1>영수증에서 재료를 찾아볼까요?</h1>
      <input type="file" accept="image/*" onChange={handleReceiptImage} />
      <div>
        {receiptImage && <img src={URL.createObjectURL(receiptImage)} alt="영수증" />}
        {textResult &&
          textResult.map((line, idx) => {
            return <div key={idx}>{line.text}</div>;
          })}
      </div>
    </div>
  );
}

export default Receipt;
