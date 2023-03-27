import React, { useState } from 'react'
import ProductForm from '../components/ProductForm';
import axios from 'axios';


const initalState = {
  name: "",
  image: "",
  price: 0,
  dampingRate: 0.8,
  amount: 1,
};
const NewProduct = () => {
  const url = process.env.REACT_APP_API_URL;
  const [formData,setFormData] = useState(initalState)

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value })//change eventının gerçekleştiği inputtaki id attribute u ile formDatamdaki key değerlerim aynı olduğu için dinamik bir şekilde formData mı güncelleybiliyorum
    console.log({ [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post(url, formData);
      setFormData(initalState)//post işleminden sonra formu boşaltmak için initialState değerini verdik

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="container">
      <ProductForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        text="New"
      />
    </div>
  );
}

export default NewProduct