import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default LayOut
