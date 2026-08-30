import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [data,setData]=useState({});

    useEffect(()=>{

        loadDashboard();

    },[]);

    const loadDashboard=async()=>{

        const token=localStorage.getItem("token");

        const res=await api.get("/dashboard",{

            headers:{
                Authorization:`Bearer ${token}`
            }

        });

        setData(res.data);

    };

    return(

        <div style={styles.page}>

            <h1 style={styles.heading}>
                🚑 Ambulance Booking Dashboard
            </h1>

            <div style={styles.grid}>

                <DashboardCard
                    title="Available"
                    value={data.available_ambulances}
                    color="#22c55e"
                    icon="🚑"
                />

                <DashboardCard
                    title="Busy"
                    value={data.busy_ambulances}
                    color="#ef4444"
                    icon="🚨"
                />

                <DashboardCard
                    title="Bookings"
                    value={data.total_bookings}
                    color="#2563eb"
                    icon="📋"
                />

                <DashboardCard
                    title="Pending"
                    value={data.pending_bookings}
                    color="#f59e0b"
                    icon="⏳"
                />

            </div>

        </div>

    );

}

const styles={

page:{

background:"#eef3f8",

minHeight:"100vh",

padding:"40px"

},

heading:{

marginBottom:"40px",

textAlign:"center"

},

grid:{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",

gap:"25px"

}

};

export default Dashboard;