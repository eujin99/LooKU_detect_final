import React, { Component } from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Product_option from './product_option'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);

  const StyledTableContainer2 = withStyles((theme)=> ({
    root: {
      opacity:'80%',
      width:'auto',
      marginLeft:'5%',
      marginRight:'5%',
      height:'500px',
    }
  }))(TableContainer)

 
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product_Data: [],
        };
      }
    
      componentWillMount() {
        this.callApi().then((res) => {
          this.setState({
            Product_Data: res,
          });
        });
      }
    
      callApi = async () => {
        const response = await fetch("/api/product");
        const body = await response.json();
        return body;
      };
      
      render() {
        const { Product_Data } = this.state;
        
        return (
            
            <div>
                <br></br>
                <br></br><br></br>
                <h2 style={{ color: "white", textAlignLast: "center" }}>
                ※ 면역력 증가 상품
              </h2>
              <br></br>
                <StyledTableContainer2 component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        
                        <StyledTableCell align="center">상품</StyledTableCell>
                        <StyledTableCell align="center">제목</StyledTableCell>
                        <StyledTableCell align="center">가격</StyledTableCell>
                        <StyledTableCell align="center">구매</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {Product_Data.map(post=> {
                            return <Product_option src ={post.src} title={post.title} price={post.price} a={post.a}/>
                        })
                    }
                    
                    </TableBody>
                </Table>
                </StyledTableContainer2>
            </div>
           
        );
    }
}

export default Product