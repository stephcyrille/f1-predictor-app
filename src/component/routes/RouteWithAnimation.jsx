import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { PredictorFirstPage } from '../../pages/f1-predictor/firstPage/PredictorFirstPage';
import { PredictorSecondPage } from '../../pages/f1-predictor/secondPage/PredictorSecondPage';
import { PredictorThirdPage } from '../../pages/f1-predictor/thirdPage/PredictorThirdPage';

export const RouteWithAnimation = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="/" element={<PredictorFirstPage />} />
      <Route path="select-circuit" element={<PredictorSecondPage />} />
      <Route path="prediction" element={<PredictorThirdPage />} />
    </Routes>
  );
};
