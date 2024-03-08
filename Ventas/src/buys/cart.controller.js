import  Cart  from '../buys/cart.model.js'
import  Product  from '../product/product.model.js'

export const create = async (req, res) => {
    try {
        const { product, cant } = req.body
        const userId = req.user.id
        
        const carroEx = await Cart.findOne({ user: userId })

        if (carroEx) {            
            return res.status(404).send({ message: 'Ya tienes un carrito' })
        }

        const carr = new Cart({ user: userId, products: [] })

        if (products && products.length > 0) {
            for (const item of products) {
                const product = await Product.findById(item.productId)
                if (!product) {
                    return res.status(404).send({ message: `El producto con ID ${item.productId} no existe` })
                }
                if (item.quantity > product.stock) {
                    return res.status(400).send({ message: `No hay suficiente stock para el producto ${product.nameProduct}` })
                }
                carr.products.push({ product: item.productId, quantity: item.quantity })
            }
        }

        await carr.save()
        return res.send({ message: 'Carrito agregado satisfactoriamente' })

    } catch (error) {
        console.error(error) 
        return res.status(500).send({ message: 'Error procesando la compra.', error: error }) 
    }
}

