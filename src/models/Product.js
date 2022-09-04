import {Schema,model} from 'mongoose'


const ProductSchema = new Schema({
    nombre : String,
    categoria : String,
    precio : Number,
    imgURL: String
},{
    timestamps:true,
    versionKey:false
})

export default model('Product',ProductSchema)