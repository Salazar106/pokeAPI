
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function LinkSideBar() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  

 
  //!links para el sideBar cuando el usuario tiene rol Cliente
  const ClientLinks = [
    {
        name: "Search by name",
        icon: <img src={'/imgs/instinto.png'} className="w-10" />,
        path: "/pokeApi/",
    },
    {
      name: "Search by ID",
      icon: <img src={'/imgs/valor.png'} className="w-10" />,
      path: "/pokeApi/searchByID",
    }

  ]

  //! userEffect para que el boton de la pagina este alumbrando de color diferente a los demas
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {ClientLinks.map((link, i) => {
        return (
          <Link
            key={i}
            to={link.path}
            className={`flex flex-col justify-center items-center py-2 px-2 hover:text-white hover:bg-primary rounded-lg transition-all duration-700 ${path === link.path? " bg-[#b34eda] text-white shadow-md shadow-default-500 ": "bg-white text-black shadow-lg"}`}
          >
            {link.icon}
            <p className="hidden md:block text-[10px] px-2">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
