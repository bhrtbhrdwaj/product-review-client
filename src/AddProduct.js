import React from 'react';
import './AddProduct.css'
import 'bootstrap/dist/css/bootstrap.css';
const baseUrl = "http://localhost:8081/"
const Feature = () =>{ return (<React.Fragment><br/><input class="form-control" type="text" name="features"/></React.Fragment>)}
class AddProduct extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = { 
            features: [],
        }
    }
    addUser = ()=> { this.setState({
        features: [...this.state.features, <Feature />]
    })}

    addProduct(){

    }

    render(){
        return (
            <div class="d-flex justify-content-evenly mt-5">
                <form class="w-50" name="add-product" onSubmit="" action={baseUrl+ "products"} method="POST" enctype="multipart/form-data">
                <div class="form-group">
                <label for="product-id">Product Id:</label>
                <input class="form-control" id="product-id" type="text" name="id"/><br/>
                </div>
                <div class="form-group">
                <label for="product-name">Product Name:</label>
                <input class="form-control" id="product-id" type="text" name="name"/><br/>
                </div>
                <div class="form-group">
                <label for="product-image">Add Image:</label><br/>
                <input class="form-control" id="product-image" type="file" name="productImage" accept="image/*"/><br/>
                </div>
                <div class="form-group">
                <label for="feature">Add Features:</label><br/>
                <input class="form-control" type="text" name="features"/>
                </div>
                {this.state.features}<br/>
                <a class="add-feature" href="#" onClick={this.addUser}>Add another feature</a><br/><br/><br/>
                <input  type="submit" value="Add Product" />
                </form>
            </div>
        );
    }
}

export default AddProduct;