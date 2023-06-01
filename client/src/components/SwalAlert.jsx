import swal from 'sweetalert';

import { useEffect } from 'react';

function SwalAlert({ title, text, icon }) {
  useEffect(() => {
    const swalAlert = async () => {
      await swal({
        title,
        text,
        icon,
      });
    };
    swalAlert();
  }, [title, text, icon]);
  return null;
}

export default SwalAlert;
