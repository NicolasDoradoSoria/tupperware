import Products from "../models/Products"
import Category from "../models/Category"
import Cart from "../models/Cart"
import User from '../models/User'
import Role from '../models/Role'
import CarruselImage from '../models/CarruselImage'
import Order from '../models/Order'

export class Repository {
    constructor(model) {
        this.model = model
    }

    async get(id) {
        return await this.model.find(id)
    }

    async create(entity) {
        return await this.model.create(entity)
    }

    async update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true })
    }

    async delete(id) {
        await this.model.findByIdAndDelete(id)
        return true
    }
}

export class ProductRepo extends Repository {
    constructor() {
        super(Products)
    }

    async getProductByCategory(filter) {
        return await Products.find(filter).populate({ path: "imageId", model: "ProductImages" }).populate("category");
    }
}

export class CategoryRepo extends Repository {
    constructor() {
        super(Category)
    }
}

export class CartRepo extends Repository {
    constructor() {
        super(Cart)
    }

    async get(id) {
        return await Cart.find(id).populate({ path: "products.id", model: "Productos" })
    }

    async deleteProductCart(idUser, idCart) {
        await Cart.findOneAndUpdate({ user: idUser },
            { $pull: { products: { _id: idCart } } });
        return true
    }

    async delete(id){
       await Cart.findOneAndDelete(id)
    }
}

export class UserRepo extends Repository {

    constructor() {
        super(User)
    }
    async get(id, hasPassword) {
        let user
        if (hasPassword) {
            user = await User.find(id).select('-password').populate("roles")
        }
        else {
            user = await User.find(id).populate("roles")
        }
        return user[0]
    }

    async save(entity) {
        await entity.save()
    }

}

export class RoleRepo extends Repository {
    constructor() {
        super(Role)
    }

}

export class CarruselImageRepo extends Repository {
    constructor() {
        super(CarruselImage)
    }
}

export class OrderRepo extends Repository {
    constructor() {
        super(Order)
    }
    async get(id) {
        return await Order.find(id).populate({ path: "products.id", model: "Productos" })
    }

}