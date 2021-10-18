import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummy = [
  {
    title: "Test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    title: "Test 2 ",
    price: 5,
    description: "This is a Second product - amazing!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy.map((item) => (
          <ProductItem
            key={item.title}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
