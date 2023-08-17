import React from 'react'

const Blog = () => {
  return (
    <div>
                             {/* {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.pictureURL} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                     <LoadingButton 
                                        loading={loading && target === product.id} 
                                        onClick={() => handleDeleteProduct(product.id)} 
                                        startIcon={<Delete />} color='error' /> 
                                </TableCell>
                            </TableRow>
                        ))} */}
    </div>
  )
}

export default Blog