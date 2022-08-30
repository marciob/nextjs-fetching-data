import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  //params object is a default property from nextjs that returns the paramters passed in the URL
  //it returns in a key value pairs
  const { params } = context;

  //pid is the parameter passed in the URL
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      //in this example pid is the identifier for the dynamic page [pid].js
      //p1, p2 and p3 are the key values from that identifier that will be got by getStaticPaths
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
