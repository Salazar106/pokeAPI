import { toast } from "sonner";


export  const errorToast = (title) => {
    toast.error(`${title}`, {
      position: "bottom-right",
      style: {
        fontSize: "15px",
        padding: "25px",
      },
    })
  }

  export  const successToast = (title) => {
    toast.success(`${title}`, {
      position: "bottom-right",
      style: {
        fontSize: "15px",
        padding: "25px",
      },
    })
  }

  export  const warningToast = (title) => {
    toast.warning(`${title}`, {
      position: "bottom-right",
      style: {
        fontSize: "15px",
        padding: "25px",
      },
    })
  }