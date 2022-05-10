import ToolBarItem from "../components/tool-bar/ToolBarItem";

import { Box, Button, Container, Toolbar, Typography, MenuItem } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Select } from 'formik-material-ui';

import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useVendorIndex } from "../hooks/useVendorIndex";
import { useProducts } from "../hooks/useProducts";
import { useSlugify } from "../hooks/useSlug";
import { useSnackbar } from "../hooks/useSnackbar";

import * as Yup from 'yup';

// Will be replaced with actual data lookup later!

const INITIAL_VALUES = {
  name: '',
};

const industries = {
  tags: [
    {
      id: "construction",
      name: "Construction",
    }, {
      id: "retail",
      name: "Retail",
    }, {
      id: "energy",
      name: "Energy",
    }
  ]
};

const productTypes = {
  tags: [
    {
      id: "business-software",
      name: "Business Software",
    }, {
      id: "api",
      name: "API"
    }, {
      id: "database",
      name: "Database"
    }, {
      id: "analytics-tool",
      name: "Analytics Tool"
    }
  ]
};

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Name is required.'),
  vendor: Yup.string()
    .required('Please select a vendo.'),
  industries: Yup.array()
    .required('Please select at least one industry.'),
  productType: Yup.string()
    .required('Please select a product type.'),
});

const useStyles = makeStyles((theme) => ({
  formField: {
    minWidth: 300,
  },
  errMessage: {
    color: '#f44336',
    fontSize: '0.75rem',
    marginTop: 5,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  }
}));


const ProductsCreatePage = () => {
  const classes = useStyles();

  const { vendors } = useVendorIndex();
  const { create } = useProducts();

  const slugify = useSlugify();
  const { push } = useHistory();
  const { openSnackbar } = useSnackbar();

  console.log(vendors, industries, productTypes);

  const handleCreateProduct = useCallback((product) => {
    const id = slugify(product.name);
    return create(product).then(() => {
      openSnackbar("Product successfully created");
      // push("/products");
    }).catch(e => {
      openSnackbar(e.error, "error");
    });
  }, [create, slugify, push, openSnackbar]);

  return (
    <>
      <Toolbar>
        <ToolBarItem>
          <Typography variant="h2">Produkt erstellen</Typography>
        </ToolBarItem>
      </Toolbar>

      <Container>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleCreateProduct}
          validationSchema={ProductSchema}
        >
          {({ submitForm, isSubmitting, errors, touched }) => (
            <Form className="product-form">
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="name"
                  type="name"
                  label="Name"
                  variant="outlined"
                  className={classes.formField}
                />
              </Box>

              <Box margin={1}>
                <Field
                  component={TextField}
                  type="text"
                  name="vendor"
                  label="Vendor"
                  select
                  variant="outlined"
                  className={classes.formField}
                >
                  {vendors.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Field>
              </Box>

              <Box margin={1}>
                <Field
                  component={Select}
                  type="text"
                  name="industries"
                  label="Industries"
                  variant="outlined"
                  multiple={true}
                  defaultValue={[]}
                  className={`form-field ${
                    errors.industries ? "is-invalid" : ""
                  }`}
                >
                  {industries.tags.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Field>
                { errors.industries && touched.industries && <div className={classes.errMessage}>{errors.industries}</div> }
              </Box>

              <Box margin={1}>
                <Field
                  component={TextField}
                  type="text"
                  name="productType"
                  label="Product Type"
                  select
                  variant="outlined"
                  className={classes.formField}
                >
                  {productTypes.tags.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Field>
              </Box>

              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Produkt erstellen
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default ProductsCreatePage;
