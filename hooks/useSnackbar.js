import { useCallback } from "react";
import { useSnackbar as useSnackbarExternal } from "notistack";

const useSnackbar = () => {
  const { enqueueSnackbar } = useSnackbarExternal();

  const openSnackbar = useCallback(
    (message, variant = "success") => {
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 2000,
      });
    },
    [enqueueSnackbar]
  );

  return {
    openSnackbar,
  };
};

export { useSnackbar };
