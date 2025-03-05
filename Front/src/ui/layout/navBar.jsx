import AvatarDrawer from "./avatarDrawer";
import { format } from 'date-fns'; 
import { es } from 'date-fns/locale';
import { FcCalendar } from "react-icons/fc";
const immg = '/pokemon.png';
export const NavBar = () => {

  const capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1); };
  const ahora = new Date(); 
  const diaSemana = capitalizeFirstLetter(format(ahora, 'EEEE', { locale: es })) 
  const diaMes = format(ahora, 'd', { locale: es }); 
  const año = format(ahora, 'yyyy', { locale: es });
  const mes = capitalizeFirstLetter(format(ahora, 'MMMM', { locale: es }));


    return (
      <div className="h-20 w-full">
        <nav className="bg-[#b34eda] z-50 h-20 flex justify-between items-center w-full sm:w-[90%] lg:w-[88%]  xl:w-[90%] 2xl:w-[93%] 3xl:w-[95%]   px-2 sm:px-5 sm:rounded-2xl shadow-md shadow-gray-400 transition-all duration-500 absolute">
          <div className="bg-white w-20 flex h-16 rounded-lg justify-center md:hidden">
            <img className="h-[70px] top-1" src={immg}/>
          </div>
          <div className="flex flex-col font-bold text-lg text-white">
            
            <h1 className="items-center gap-1 hidden sm:flex"><FcCalendar/>{mes}</h1>
            <h1>{diaSemana} {diaMes}-{año}</h1>
          </div>
          <AvatarDrawer />
        </nav>

      </div>
  );
};
