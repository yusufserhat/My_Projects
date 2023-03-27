
import Main from "./pages/Main";
import NewProduct from "./pages/NewProduct";
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import UpdateProduct from "./pages/UpdateProduct";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="bg-light app">
      {/* <Navbar/>
      <Main/>
      <About/>
      <NewProduct/>
      <ProductList/> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/new-product" element={<NewProduct/>} />
          <Route path="/product-list" element={<ProductList/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/update-product" element={<UpdateProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
