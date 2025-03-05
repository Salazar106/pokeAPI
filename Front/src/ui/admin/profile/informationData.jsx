import { Image } from "@nextui-org/react";
import ModalForms from "../../layout/modal";
import logoUser from "../../../assets/imgs/NUpack/usuario.webp";
import {
  FaEarthAmericas,
  FaIdCard,
  FaPhone,
  FaLocationCrosshairs,
  FaLocationDot,
} from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { ChangePasswordForm } from "../../auth/changePasswordForm";
import EditUser from "./editProfileForm";
import { useRefreshTable } from "../../../hooks/refreshTable";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../context/context";
import { SkeletonInformationData } from "./SkeletonInformationData";
import { FcEditImage } from "react-icons/fc";
import { EditImgForm } from "./editImgForm";


export const InformationData = () => {
  const { actualUser, $Auth } = useContext(MyContext);
  const { refresh, setRefresh } = useRefreshTable();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(actualUser);
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await $Auth.getUserProfile(actualUser.id);
        setUser(response.data.user_account);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const DataItem = [
    {
      icon: <FaIdCard className="text-purple-500" />,
      title: "Identificación",
      description: `${user.documentTypeName}.${user.document}`,
    },
    {
      icon: <IoIosMail className="text-purple-500" />,
      title: "Correo",
      description: user.email,
    },
    {
      icon: <FaPhone className="text-purple-500" />,
      title: "Teléfono",
      description: user.phone,
    },
    {
      icon: <FaEarthAmericas className="text-purple-500" />,
      title: "Pais",
      description: user.country,
    },
    {
      icon: <FaLocationDot className="text-purple-500" />,
      title: "Departamento",
      description: user.department,
    },
    {
      icon: <FaLocationDot className="text-purple-500" />,
      title: "Municipio",
      description: user.city,
    },
    {
      icon: <FaLocationCrosshairs className="text-purple-500" />,
      title: "Dirección",
      description: user.address,
    },
  ];

  return (
    <div>
      {isLoading ? <SkeletonInformationData/> : (
        <div>
            <div>
                <div className="flex flex-wrap lg:flex-nowrap w-full gap-10 justify-center items-center">
                  <div className="flex flex-col min-w-80  border-2 border-purple-300 p-10 rounded-lg shadow-lg shadow-slate-500 bg-purple-100">
                    <div className="w-full flex flex-col items-center gap-1 justify-center">
                      <Image
                          className="rounded-full shadow-large shadow-my-black"
                          width={200}
                          height={200}
                          src={!user.avatar ? logoUser : user.avatar}
                          alt="Foto de Perfil"
                      />
                      <ModalForms title={"Cambiar foto de Perfil"} nameBtn={<FcEditImage className="text-2xl"/>} table={true}>
                        <EditImgForm idUser={user.id}/>
                      </ModalForms>
                    </div>
                    <p className="text-[25px] font-bold text-center text-purple-800">
                    {user.name}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-7 p-4 transition-all duration-1000">
                    {DataItem.map((item, i) => (
                      <div key={i} className="flex md:flex-col">
                        <p className="flex flex-nowrap items-center gap-1">
                          {item.icon}
                          <strong className="text-purple-800">{item.title}:</strong>
                        </p>
                        <p>{item.description}</p>
                      </div>
                    
                    ))}
                </div>
                </div>
                  <div className="flex w-full flex-wrap mt-5 justify-end gap-2 md:gap-10 items-end">
                    <ModalForms nameBtn={"Editar Perfil"} title={`${user.name} Edita Tu Perfil`} isPreview={true}>
                        <EditUser user={user} isMyProfileEdit={true} />
                    </ModalForms>
                    <ModalForms nameBtn={"Cambiar Contraseña"}>
                        <ChangePasswordForm idUser={user.id}  />
                    </ModalForms>
                  </div>
            </div>
        </div>
      )}
      
    </div>
  );
};
