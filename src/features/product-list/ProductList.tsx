import { supabase } from "@/services/supabaseClient";
import { ProductModel } from "@/types";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ProductDialog from "./ProductDialog";
import { setBannerTitle } from "@/components/layout/topBannerSlice";
import { useAppDispatch } from "@/app/hooks";
const ProductList = () => {
  useAppDispatch()(
    setBannerTitle({
      title: "Product List",
      subTitle: "Update your product stocks here",
    })
  );
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<ProductModel>({
    purposes: [] as string[],
  } as ProductModel);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;

  const columns: TableColumn<ProductModel>[] = [
    {
      name: "Product Name",
      selector: (row) => row.name,
    },
    {
      name: "Size",
      selector: (row) => row.size,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
    },
    {
      name: "Purposes",
      selector: (row) => row.purposes.join(","),
    },
  ];

  const getData = async () => {
    setLoading(true);
    const from = (currentPage - 1) * pageSize;
    const to = (currentPage - 1) * pageSize + pageSize;
    console.log([from, to]);
    const products = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);
    setTotal(products.count || 0);
    const productModels = products.data!.map(
      (product) =>
        ({
          brand: product.brand,
          id: product.id,
          name: product.product_name,
          purposes: product.purposes,
          size: product.size,
          stock: product.stock,
        } as ProductModel)
    );
    setProductList(productModels);
    setLoading(false);
  };

  const goTo = (page: number) => {
    setCurrentPage(page);
  };

  const addNew = () => {
    setIsCreate(true);
  };

  useEffect(() => {
    getData().catch(console.error);
  }, [currentPage]);

  return (
    <div className="conatiner-fluid content-inner mt-n5 py-0">
      <ProductDialog
        isCreate={isCreate}
        isOpen={isCreate}
        key={currentProduct.id}
        product={currentProduct}
        onClose={(reload: boolean) => {
          setIsCreate(false);
          if (reload) getData().catch(console.error);
          setCurrentProduct({
            purposes: [] as string[],
            id: new Date().getTime() + "",
          } as ProductModel);
        }}
      />
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <div className="header-title w-100 d-flex">
                <h4 className="card-title">Product List</h4>
                <button className="btn btn-primary ms-auto" onClick={addNew}>
                  Add New
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  data={productList}
                  pagination
                  paginationServer
                  paginationTotalRows={total}
                  progressPending={loading}
                  paginationComponentOptions={{ noRowsPerPage: true }}
                  onChangePage={(page) => goTo(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
