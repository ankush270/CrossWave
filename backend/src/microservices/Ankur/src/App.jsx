import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import ErrorBoundary from './components/ErrorBoundary';
import BuyNow from './components/BuyNow';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="/buy-now/:id" element={<BuyNow />} />
          <Route 
            path="/test-buy-now" 
            element={
              <BuyNow 
                testData={{
                  productId: 'test-product',
                  productName: 'Test Product',
                  finalPrice: 1000,
                  finalQuantity: 100,
                  type: 'negotiated',
                  chatId: 'test-chat-id'
                }}
              />
            } 
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App; 