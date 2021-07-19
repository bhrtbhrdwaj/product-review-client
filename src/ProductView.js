import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';
const baseUrl = "https://product-review-x.herokuapp.com/";


function Feature({ features }) {
    return (
        <div class="card bg-light mb-3 w-50">
            <div class="card-header">Features</div>
            <div class="card-body">
                <ul class="list-group">{features.map(f => (
                    <li class="list-group-item list-group-item-primary m-1">{f.feature}</li>
                     ))}
                </ul>
            </div>
    </div>);
}
function ShowErrors({errors}){
return (
<div class="alert alert-danger">
            {errors.map(error=><p key={error}>{error}</p>)}
            </div>
);
}
class AddComment extends React.Component{
    constructor(props){
        super(props);
        this.state={
                errors:[], hasError: false
            }

        this.name = React.createRef();
        this.email = React.createRef();
        this.comment = React.createRef();
        this.submitComment = this.submitComment.bind(this);
    }
    
    handleValidation(comment){
        let errors=[];
        let name = comment.name.length;
        let email = comment.email;
        let com= comment.comment.length;
        let validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
         );
        if(name === 0 || name > 51){
            errors.push("Invalid Name.");
        }
        if(!validEmail.test(email)){
            errors.push("Invalid Email.");
        }
        if(com === 0 || com > 100){
            errors.push("Invalid Comment.")
        }

        return errors;
    }

    submitComment(e){

        let comment = {
            name: this.name.current.value, email: this.email.current.value,
            comment: this.comment.current.value
        }

        let error=this.handleValidation(comment);

        if(error.length>0){
            this.setState({errors: error, hasError: true});
        }else{
        this.setState({errors: [], hasError: false});            
        axios.post(baseUrl+"products/"+this.props.proId+"/comments", comment)
        .then((res)=>  this.props.handleToUpdate(res.data));
        this.name.current.value = "";
        this.email.current.value = "";
        this.comment.current.value="";
        }
    }
    render(){
        return (
            <div class="w-50">
            { this.state.hasError ? <ShowErrors errors={this.state.errors} /> : null}
            <div class="m-2">
                <div class="form-group">
                <label for="by">Name:</label><input class="form-control" type="text" ref={this.name}/><br/>
                </div>
                <div class="form-group">
                <label for="by">Email:</label><input class="form-control" type="email" ref={this.email}/><br/>
                </div>
                <div class="form-group">
                <label for="comment">Review:
                </label><textarea class="form-control" ref={this.comment}></textarea><br/>
                </div>
                <button class="btn btn-primary" disabled={this.state.disabled} onClick={this.submitComment}>Submit</button>
            </div>
            </div>
        );
    }
}

function Image({url, name}){
    return (
<div class="card-group w-25">
<div class="card">
  <img class="card-img-top" src={baseUrl+url} alt={name}/>
  <div class="card-body">
    <h5 class="card-title text-center">{name}</h5>
  </div>
</div>
</div>
);
}

function Comment({ comments }) {
    return (<div>
         {comments.map(c => (
    <div class="card">
    <div class="card-header">
        {c.name}
    </div>
    <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>{c.comment}</p>
      <footer class="blockquote-footer">on <cite>{new Date(c.at).toDateString()}</cite></footer>
    </blockquote>
    </div>        
                
    </div>            ))}
    </div>);
}
class ProductView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            product: {},
            features: [],
            comments: []
        }
        var handleToUpdate = this.handleToUpdate.bind(this);
    }

    handleToUpdate(comment){
        let c = this.state.comments;
        c.unshift(comment);
        this.setState(
            {
                comments: c
            }
        );
    }



    componentDidMount(){
        axios.get(baseUrl + "products/"+this.props.match.params.id) // fetch don't have json by default
        .then(res=>{
            const product=res.data
            this.setState({product: product, features: product.features,
            comments: product.comments})
        })

    }
    render(){
        var handleToUpdate = this.handleToUpdate;
        
   return(
   <div>
        <div class="d-flex justify-content-evenly">
        <Image url={this.state.product.photosImagePath} name={this.state.product.productName} />
        <Feature features={this.state.features} />
        </div>
        <div class="w-2 d-flex justify-content-evenly">
        <div class="overflow-auto w-50">
        <h2>Reviews so far: {this.state.comments.length}</h2>
        <Comment comments={this.state.comments} />
        </div>
        <AddComment proId={this.state.product.id} handleToUpdate = {handleToUpdate.bind(this)}/>
        </div>
   </div>); 
}
}

export default withRouter(ProductView);