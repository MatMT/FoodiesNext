import Heading from "@/components/order/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";

export default function page() {
  return (
    <>
      <Heading>Create a new Product</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
