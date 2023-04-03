import React, { useEffect, useState } from "react";
import { Toolbar, Tooltip, Typography, Button, Modal } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "../../../../services/posService";
import { alpha } from "@mui/material/styles";
import { Stack } from "@mui/system";
import POSCreateModal from "../posCreateModal/POSCreateModal";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "20px",
    "&.MuiButton-contained": {
      backgroundColor: "#ffaf36",
      color: "black",
      "&:hover": {
        backgroundColor: "#ea8c00",
        boxShadow: "none",
      },
      "&:disabled": {
        backgroundColor: "#ffffff",
        boxShadow: "none",
        color: "#d3d3d3",
      },
    },
    "&.MuiButton-outlined": {
      color: "#ff9a00",
      border: "2px solid #ffaf36",
      "&:hover": {
        border: "2px solid #000000",
        color: "#000000",
      },
    },
  },
}));

const tableTheme = createTheme({
  palette: {
    primary: {
      main: "#E7EBF0",
    },
    secondary: {
      main: "#ff9a001f",
    },
    secondary2: {
      main: "#ffaf36",
    },
  },
});
export default function POSTableToolBar(props) {
	const [loaderState, setLoaderState] = useState({ success: false, loading: true });
	const [openLoader, setOpenLoader] = useState(false);


  const { locationID } = props;
  const [openCreatePos, setOpenCreatePos] = useState(false);

  const handleOpenCreatePos = () => setOpenCreatePos(true);
  const handleCloseCreatePos = () => {
		props.fetchPOS();
		setOpenCreatePos(false);
	}

  console.log(locationID);
  const classes = useStyles();
  const { numSelected } = props;
  const { selectedIds } = props;

 
  const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		props.fetchPOS();
		setOpen(false);
	};

  let deletePos = async () => {
	setOpenLoader(true)
	const deleteIds = await selectedIds.forEach(id => {
			Delete({ id: id }).catch(() => {
        setLoaderState({ ...loaderState, loading: false, success: false });
        setOpen(false);
      });;
	})

      setLoaderState({ ...loaderState, loading: false, success: true });
      props.fetchPOS();
      setOpenLoader(false)
}


  const createPOSTooltip = (
    <Tooltip title="Create a Point of Sale">
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        endIcon={<CreateIcon />}
        onClick={handleOpenCreatePos}
      >
        Create a Point of Sale
      </Button>
    </Tooltip>
  );

  const deletePosTooltip = (
    <Tooltip title="Delete Selected POS">
      <Button
        className={classes.button}
        size="small"
        variant="outlined"
        endIcon={<DeleteIcon />}
		onClick={deletePos}
      >
        Delete Point of Sale
      </Button>
    </Tooltip>
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.secondary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Point of Sale
          </Typography>
        )}

        {numSelected === 1 ? (
          <Stack direction="row" spacing={1}>
            {deletePosTooltip}
            {createPOSTooltip}
          </Stack>
        ) : numSelected > 1 ? (
          <Stack direction="row" spacing={1}>
            {deletePosTooltip}
            {createPOSTooltip}
          </Stack>
        ) : (
          <Stack direction="row" spacing={0}>
            {createPOSTooltip}
          </Stack>
        )}

        <Modal
          open={openCreatePos}
          onClose={handleCloseCreatePos}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <POSCreateModal
            locationID={locationID}
            handleClose={handleCloseCreatePos}
          />
        </Modal>
      </Toolbar>
    </ThemeProvider>
  );
}

POSTableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  fetchPOS: PropTypes.func.isRequired,
	selectedIds: PropTypes.array.isRequired,
	locationId: PropTypes.number.isRequired
};
