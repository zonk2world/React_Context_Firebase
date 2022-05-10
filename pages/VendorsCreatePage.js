import {Box, Container, Toolbar, Typography} from "@material-ui/core";
import {useVendors} from "../hooks/useVendors";
import {useCallback} from "react";
import ToolBarItem from "../components/tool-bar/ToolBarItem";
import {Formik, Form, Field} from 'formik';
import {Button} from '@material-ui/core';
import {TextField} from 'formik-material-ui';
import {useSlugify} from "../hooks/useSlug";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "../hooks/useSnackbar";

const INITIAL_VALUES = {
  name: '',
  domain: ''
};

const VendorsCreatePage = () => {
  const {create} = useVendors();
  const slugify = useSlugify();
  const {push} = useHistory();
  const {openSnackbar} = useSnackbar();

  const handleCreateVendor = useCallback((vendor) => {
    const id = slugify(vendor.name);
    return create(id, vendor).then(() => {
      openSnackbar("Vendor successfully created");
      push("/vendors");
    }).catch(e => {
      openSnackbar(e.error, "error");
    });
  }, [create, slugify, push, openSnackbar]);

  return (
    <>
      <Toolbar>
        <ToolBarItem>
          <Typography variant="h2">Hersteller anlegen</Typography>
        </ToolBarItem>
      </Toolbar>
      <Container>
        <Formik initialValues={INITIAL_VALUES} onSubmit={handleCreateVendor}>
          {({submitForm, isSubmitting}) => (
            <Form>
              <Field
                component={TextField}
                name="name"
                type="name"
                label="Name"
                variant="outlined"
              />
              <br/>
              <Field
                component={TextField}
                name="domain"
                type="domain"
                label="Domain"
                variant="outlined"
              />
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Hersteller anlegen
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
};

export default VendorsCreatePage;