import Product from "../models/Product";

//crear un nuevo producto
export const createProduct = async (req, res) => {
  const { nombre, categoria, precio, imgURL } = req.body;
  console.log(req.body);
  const newProduct = new Product({
    nombre,
    categoria,
    precio,
    imgURL,
  });
  const ProductSave = await newProduct.save();

  res.status(201).json({
    message: "POST /products",
    data: ProductSave,
  });
};
//obtener todos los productos
export const getProducts = async (req, res) => {
  const AllProducts = await Product.find();

  res.status(200).json({
    message: "GET /products",
    products: AllProducts,
  });
};
//obtener un producto por id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const ProductFind = await Product.findById(id);
  //validar si el producto existe
  if (!ProductFind) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.status(200).json({
    message: "GET /products/:id",
    product: ProductFind,
  });
};
//actualizar un producto por id
export const updateProduct = async(req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio, imgURL } = req.body;

  const ProductUpdatedId= await Product.findByIdAndUpdate(
    id,
    { nombre, categoria, precio, imgURL },
    { new: true }
  );

  res.status(200).send({
    message: "PUT /products/:id",
    data: ProductUpdatedId,
  });
};
//eliminar un producto por id
export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    const ProductDeleted = await Product.findByIdAndDelete(id);
    //validar si el producto existe
    if (!ProductDeleted) {
        return res.status(404).json({
            message: "Product not found",
        });
    }
    res.status(200).json({
        message: "DELETE /products/:id",
        product: ProductDeleted,
    });
};
