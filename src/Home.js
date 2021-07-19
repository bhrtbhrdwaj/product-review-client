import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './AllProducts.css';
import React from "react";
import { Link } from 'react-router-dom';
const baseUrl = "https://product-review-x.herokuapp.com/";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message: "Hi... Welcome!"
        }
    }
    componentDidMount(){
        axios.get(baseUrl + "random-welcome-message")
        .then(res=>{
            this.setState({message: res.data})
        })
    }
    render(){
        return (
            <div class="mt-10 p-20">
            <h4 class="bg-info text-white p-2 text-center">{this.state.message}</h4>
              <AllProducts />
             </div>            
        );
    }
}


class AllProducts extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products: []
        }
}
componentDidMount(){
    axios.get(baseUrl + "products")
        .then(res=>{
            const product=res.data
            this.setState({products: product})
        })
}

    render(){
        return (
            <div class="d-flex flex-wrap justify-content-evenly mt-5">
           {this.state.products.map(product => (
            <div className="p-2"><Link to={"/products/"+ product.id}>
            <img class="card-img-top" alt={product.productName} src={baseUrl+product.photosImagePath} width="200x" height="200px"/>
            <div class="card-body">
            <p class="card-title">{product.productName} --Total Reviews: {product.comments.length}</p></div></Link></div>))}
            </div> );
    }
}
export default Home;