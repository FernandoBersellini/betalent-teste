import type { HttpContext } from '@adonisjs/core/http'

import Product from "#models/product"
import { createProductValidator } from '#validators/product'
import { updateProductValidator } from '#validators/product'

export default class ProductsController {
    async index() {
        const products = await Product.all()
        return products
    }

    async show({ params }: HttpContext) {
        const product = await Product.findOrFail(params.id)
        return product
    }

    async store({ request }: HttpContext) {
        const { name, amount } = await createProductValidator.validate(request.all())
        const product = await Product.create({ name, amount })
        return product
    }

    async update({ params, request }: HttpContext) {
        const { name, amount } = await updateProductValidator.validate(request.all())
        const product = await Product.findOrFail(params.id)
        product.name = name ?? product.name
        product.amount = amount ?? product.amount
        await product.save()
        return product    
    }

    async destroy({ params }: HttpContext) {
        const product = await Product.findOrFail(params.id)
        await product.delete()
        return product
    }       
}