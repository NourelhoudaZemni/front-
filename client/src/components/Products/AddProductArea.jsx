import React, { useState , useEffect } from "react";
import axios from "axios";
import validate from './validateinfo';
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker} from 'react-color'
function AddProductArea() {
  const [product_name, setProductName] = useState("");
  const [product_gender, setProductGender] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_image, setProductImages] = useState("");
  const [product_type, setProductType] = useState("");
  const [product_color, setProductColor] = useState("");
  const [product_brand, setProductBrand] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_totalInStock, setTotalInStock] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [brandsList, setBrandsList] = useState([]);
  const [catList, setCatList] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState(true)
  
    const idUser=JSON.parse(localStorage.getItem('user'))._id
  
    // const getCat = async  () => {
  //   const {dataCat} = await axios.get(`http://127.0.0.1:5000/category/`)
  //  console.log(dataCat)
  //       setCatList(dataCat)
  // }
  useEffect( async()=>{
    const getData = async() => { 
      const {data} = await axios.get(`http://127.0.0.1:5000/category`)
    console.log(data)
    setCatList(data)
     }
     getData() 

   const {data} = await axios.get(`http://127.0.0.1:5000/brand/`)
         setBrandsList(data)
    console.log(data)
  },[])


  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", idUser);
    formData.append("product_name", product_name);
    formData.append("product_description", product_description);
    formData.append("image", product_image);
    formData.append("product_type", product_type);
    formData.append("product_color", product_color);
    formData.append("product_gender", product_gender);
    formData.append("product_price", product_price);
    formData.append("brandId", product_brand);
    formData.append("total_in_stock", product_totalInStock);
    setErrors(validate(formData));
    axios.post("http://127.0.0.1:5000/products/upload",formData
    ,{ headers : {
      "Content-Type": "multipart/form-data",
    }
    })
    .then((res)=> {
      if (res.data.message === "Product added") {
                      setMessage(product_name + " added");
                      setProductName("");
                      setProductDescription("");
                      setProductType("");
                      setProductImages("");
                      setProductColor("");
                      setProductGender("");
                      setProductPrice("");
                      setTotalInStock("");
                      setErrors('');
                     
                    }
        })
    .catch(function (error) {
      console.log(error);
    });

   
  };

  return (
    <div className="add-product-area-wrap ptb-50">
      <div className="container">
        <div className="add-product-form">
          {message !== "" && (
            <div className={`alert alert-success`} role="alert">
              {message}
            </div>
          )}
          <h2>Add Product</h2>
          <hr />
          <form onSubmit={handleAddProduct} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="product_name"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
              {product_name ==='' && <p className="error_color">{errors.product_name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="product_description">Product Description</label>
              <textarea
                className="form-control"
                id="product_description"
                value={product_description}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
              {product_description === '' && <p className="error_color">{errors.product_description}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="product_images">Product Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setProductImages(e.target.files[0])}
              />
              {product_image === '' && <p className="error_color">{errors.product_image}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="product_gender">Choose gender</label>
              <select
                className="form-control"
                value={product_gender}
                onChange={(e) => setProductGender(e.target.value)}
              >
                <option value={null}>Gender</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="kids">Kids</option>
              </select>
              {product_gender === '' && <p className="error_gender">{errors.product_gender}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="product_brand">Choose Brand</label>
              <select
                className="form-control"
                value={product_brand}
                onChange={(e) => setProductBrand(e.target.value)}
              >
                <option value={null}>Brand</option>
                {brandsList && brandsList.map(brand =><option key={brand._id} value={brand._id}>{brand.name}</option>)}
                
                
              </select>
              {product_brand === '' && <p className="error_brand">{errors.product_brand}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="product_type">Product Type</label>
              <select
                className="form-control"
                value={product_type}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value={null}>All Type</option>
               {/* {catList?.map(cat=> (<option value={cat.name}>{cat.name}</option>))}  */}
               {catList && catList.map(cat =><option key={cat._id} value={cat.name}>{cat.name}</option>)}
                
              </select>
              {product_type === '' && <p className="error_color">{errors.product_type}</p>}
            </div>
          
            <div className="form-group">
              <label htmlFor="product_price">Product Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                id="product_price"
                value={product_price}
                onChange={(e) => setProductPrice(e.target.value)}
              />
               {product_price === '' && <p className="error_color">{errors.product_price}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="product_totalInStock">Total in stock</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total in stock"
                id="product_totalInStock"
                value={product_totalInStock}
                onChange={(e) => setTotalInStock(e.target.value)}
              />
              {product_totalInStock === '' && <p className="error_color">{errors.product_totalInStock}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="product_color">Product Color </label>
     <br/>
      <div className="d-flex">
  
      
              <input
                type="text"
                className="form-control"
                placeholder="Color"
                id="product_color"
                value={product_color}
                onChange={(updatedColor) => setProductColor(updatedColor)}
                disabled
              />
              {product_color === '' && <p className="error_color">{errors.product_color}</p>}
            </div>
            </div>
            {showColorPicker && (
                     <ChromePicker id="product_color" color={product_color}  onChange={(updatedColor) => setProductColor(updatedColor.hex)}  />

      )}
     <br/>
            <button className="add-product-btn" ><i className="flaticon-shopping-cart add-product-btn-icon"></i>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductArea;
