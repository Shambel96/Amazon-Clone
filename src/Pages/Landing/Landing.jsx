import CrouselEffect from '../../Components/Carousel/Carousel';
import Category from '../../Components/Category/Category';
import Product from '../../Components/Product/Product';
import LayOut from '../../Layout/LayOut';

function Landing() {
  return (
    <LayOut>
      <CrouselEffect />
      <Category />
      <Product />
    </LayOut>
  )
}

export default Landing
