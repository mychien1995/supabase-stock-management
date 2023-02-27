import { ActionResponse, ProductModel } from "@/types";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { supabase } from "@/services/supabaseClient";
import Snackbar from "@mui/material/Snackbar";

const ProductDialog = ({
  isCreate,
  isOpen,
  onClose,
  product,
}: ProductDialogProps) => {
  const [model, setModel] = useState<ProductModel>({
    ...product,
  } as ProductModel);

  const [actionResponse, setActionResponse] = useState<ActionResponse>(
    {} as ActionResponse
  );

  const showMessage = (success: boolean, error?: string) => {
    setActionResponse({
      success: success,
      text: error ? error : isCreate ? "Product Created" : "Product Updated",
      open: true,
      error: error || "",
    });
  };

  const onSubmit = async () => {
    const submittedModel = { ...model };
    console.log(submittedModel);
    submittedModel.purposes = submittedModel.purposes.filter(
      (p) => p && p.trim().length > 0
    );
    const insertResult = await supabase.from("products").insert({
      product_name: submittedModel.name,
      brand: submittedModel.brand,
      size: submittedModel.size,
      purposes: submittedModel.purposes,
      stock: submittedModel.stock,
    });
    if (insertResult.error) {
      showMessage(false, insertResult.error.message);
      console.log(insertResult.error);
    } else {
      showMessage(true);
      onClose(true);
    }
  };

  return (
    <div>
      <Snackbar
        open={actionResponse.open}
        autoHideDuration={6000}
        message={actionResponse.text}
        onClose={() => setActionResponse({ open: false } as ActionResponse)}
      />
      <Dialog open={isOpen} maxWidth={"md"} fullWidth>
        <DialogTitle>
          {isCreate ? "Add Product Stock" : "Edit Product Stock"}
        </DialogTitle>
        <DialogContent>
          <form className="form-horizontal">
            <div className="form-group row">
              <label className="control-label col-sm-3 align-self-center mb-0">
                Product Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name here"
                  value={model.name || ""}
                  onChange={(e) => {
                    setModel({
                      ...model,
                      ...{
                        name: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-3 align-self-center mb-0">
                Brand
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brand here"
                  value={model.brand || ""}
                  onChange={(e) => {
                    setModel({
                      ...model,
                      ...{
                        brand: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-3 align-self-center mb-0">
                Size
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Size here"
                  value={model.size || ""}
                  onChange={(e) => {
                    setModel({
                      ...model,
                      ...{
                        size: e.target.value ? parseInt(e.target.value) : 0,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-3 align-self-center mb-0">
                Stock
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Stock here"
                  value={model.stock || ""}
                  onChange={(e) => {
                    setModel({
                      ...model,
                      ...{
                        stock: e.target.value ? parseInt(e.target.value) : 0,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="control-label align-self-center mb-0">
                  Purposes
                </label>
              </div>
              {model.purposes && model.purposes.length > 0 ? (
                <div className="col-sm-8">
                  {model.purposes.map((p, index) => (
                    <input
                      type="text"
                      key={index}
                      className="form-control mb-1"
                      value={p}
                      onChange={(e) => {
                        model.purposes[index] = e.target.value;
                        setModel({ ...model, ...{ purposes: model.purposes } });
                      }}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
              <div className="col-sm-1 ">
                <button
                  type="button"
                  className="btn btn-xs btn-primary"
                  onClick={() => {
                    model.purposes.push("");
                    setModel({ ...model, ...{ purposes: model.purposes } });
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary" onClick={() => onSubmit()}>
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => onClose(false)}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export interface ProductDialogProps {
  isCreate: boolean;
  isOpen: boolean;
  product?: ProductModel;
  onClose: (reload: boolean) => void;
}

export default ProductDialog;
