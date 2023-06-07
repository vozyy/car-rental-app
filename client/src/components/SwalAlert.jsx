import swal from 'sweetalert';

import { useEffect } from 'react';

function SwalAlert({
  title,
  text,
  icon,
  buttons,
  onConfirmation,
  onCancelation,
}) {
  useEffect(() => {
    const swalAlert = async () => {
      const result = await swal({
        title,
        text,
        icon,
        buttons,
      });

      if (result) {
        onConfirmation();
      } else {
        onCancelation();
      }
    };
    swalAlert();
  }, [title, text, icon, buttons, onConfirmation, onCancelation]);
  return null;
}

export default SwalAlert;
