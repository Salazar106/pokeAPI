// import Image from "";
import LinkSideBar from './linksSideBar';

export const SideBar = () =>{
    return (
        <div className="flex h-full flex-col shadow-small ">
            <div className="flex grow md:w-24 flex-row justify-center space-x-2 bg-violet-100 md:flex-col md:space-x-0 md:shadow-large md:space-y-2 p-2">
                <img className="h-20 absolute top-1 hidden md:block" src='/pokemon.png' height={75}/>
                <LinkSideBar />
            </div>
        </div>
    )
}