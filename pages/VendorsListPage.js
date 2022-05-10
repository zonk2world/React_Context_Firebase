import {
  Box,
  Button,
  IconButton,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import ToolBarItem from "../components/tool-bar/ToolBarItem";
import {Add, Edit, NavigateBefore, NavigateNext, Refresh} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useVendorCollection} from "../hooks/useVendorCollection";
import Timestamp from "../components/format/Timestamp";

const VendorsListPage = () => {
  const {vendors, init, prev, next} = useVendorCollection();

  useEffect(init, [init]);

  return (
    <>
      <Toolbar>
        <ToolBarItem>
          <Typography variant="h2">Hersteller</Typography>
        </ToolBarItem>
        <ToolBarItem>
          <Button color="primary" startIcon={<Add/>} component={Link} to="/vendors/new">
            Hersteller anlegen
          </Button>
        </ToolBarItem>
        <ToolBarItem>
          <IconButton onClick={next}>
            <Refresh/>
          </IconButton>
        </ToolBarItem>
      </Toolbar>
      <Box height="400px" width="100%">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Updated at</TableCell>
                <TableCell>
                  <IconButton onClick={prev} size="small">
                    <NavigateBefore />
                  </IconButton>
                  <IconButton onClick={next} size="small">
                    <NavigateNext />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id} hover={true}>
                  <TableCell component="th" scope="row">
                    {vendor.data.name}
                  </TableCell>
                  <TableCell>{vendor.data.domain}</TableCell>
                  <TableCell>
                    <Timestamp value={vendor.data.createdAt}/>
                  </TableCell>
                  <TableCell>
                    <Timestamp value={vendor.data.updatedAt}/>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default VendorsListPage;