import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Index.css'
import { connect } from "react-redux"; 
import { get_total_price, removeFromCart } from '../../actions';
const Index = ({carts}) => {
    //console.log(carts)
    return (
        <div>
            <Navbar />
            <div className="container bootstrap snippets bootdey">
                <div className="col-md-9 col-sm-8 content">
                    <div className="row">
                        <div className="col-md-12">
                            <ol className="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li className="active">Cart</li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-info panel-shadow">
                                <div className="panel-heading">
                                    <h3>
                                        <img className="img-circle img-thumbnail" src="https://bootdey.com/img/Content/user_3.jpg" />
                            Matew darfkmoun
                        </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Description</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                               //  console.log("cartsForTest: ",this),
                                                (JSON.parse(localStorage.getItem("cart")) !== null)?
                                                JSON.parse(localStorage.getItem("cart")).map((cartItem) => (
                                                    console.log('cartitemfortest',cartItem),
                                                    <tr>
                                                        <td><img src={"/images/"+cartItem.product.image} className="img-cart" /></td>
                                                        <td><strong>{cartItem.product.image}</strong><p>Size : 26</p></td>
                                                        <td>
                                                            <form className="form-inline">
                                                                <input className="form-control" type="number" defaultValue="1" value={cartItem.qty} />
                                                                <button rel="tooltip" className="btn btn-default"><i className="fa fa-pencil"></i></button>
                                                                <button className="btn btn-primary" ><i className="fa fa-trash-o"></i></button>
                                                            </form>
                                                        </td>
                                                        <td>{`${cartItem.product.price}$`}</td>
                                                        <td>{`${cartItem.product.price*cartItem.qty}$`}</td>
                                                    </tr>


                                                )):"no items in cart"}
                                                      <tr>
                                                    <td colSpan="6">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right">Total Product</td>
                                                     <td>{localStorage.totalProduct}</td> 
                                                    {/*<td>{JSON.parse(localStorage.getItem("cart"))!==null?localStorage.getItem("total_price"):0}</td>*/}
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right">Total Shipping</td>
                                                    <td>{localStorage.totalShipping}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Total</strong></td>
                                                    <td>${localStorage.total_price}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="btn btn-success"><span className="glyphicon glyphicon-arrow-left"></span>&nbsp;Continue Shopping</a>
                            <a href="#" className="btn btn-primary pull-right">Next<span className="glyphicon glyphicon-chevron-right"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        carts: state.cart,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        get_total_price: () => dispatch(get_total_price()),
        RemoveFromCart: (prod_id) => dispatch(removeFromCart(prod_id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
