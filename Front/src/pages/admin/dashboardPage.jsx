import { useContext, useEffect, useState } from "react"
import ProductChart from "../../ui/admin/dashboard/productsChart"
import SalesChart from "../../ui/admin/dashboard/salesChart"
import { SkeletonsCharts } from "../../ui/admin/dashboard/skeletonsCharts"
import StatusChart from "../../ui/admin/dashboard/circularChart"
import { MyContext } from "../../context/context"
import { toast } from "sonner"
import { Select, SelectItem } from "@nextui-org/react"
import { FaCalendar } from "react-icons/fa6"
import Pokedex from "../../ui/pokedex/pokedex"

export const DashboardPage = () => {
    
    

    return (
        <div className="min-h-screen bg-gray-100">
            <Pokedex />
        </div>
    );
};
