import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Product_option extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell><img src={this.props.src} width="80px" height="80px"/></TableCell>
                <TableCell>{this.props.title}</TableCell>
                <TableCell>{this.props.price}</TableCell>
                <TableCell><a href={this.props.a}>구매</a></TableCell>
            </TableRow>
        )
    }
}

export default Product_option;