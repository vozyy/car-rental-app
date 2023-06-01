import swal from 'sweetalert';

import { useEffect } from 'react';

function SwalAlert({ title, text, icon, buttons }) {
  useEffect(() => {
    const swalAlert = async () => {
      await swal({
        title,
        text,
        icon,
        buttons,
      });
    };
    swalAlert();
  }, [title, text, icon, buttons]);
  return null;
}

export default SwalAlert;
