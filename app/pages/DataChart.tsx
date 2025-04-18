
import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import Chart from '~/components/Cart';

import { database } from '~/lib/firebaseconfig';


interface Vehicles {
    color:string;
    company:string;
    entry_time: string;
    exit_time:string;
    number_plate: string;
    track_id:number;
    vehicle_type:string;
  }
const DataChart = () => {
    const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  
  useEffect(()=>{
    const useRef = ref(database,'parking_data');
    get(useRef).then((snapshot)=>{
      if(snapshot.exists()) {
        const VehicleArray = Object.entries(snapshot.val()).map(([id,data])=>{
          return {
            id,
            ...data as Vehicles,
          };
        });
        setVehicles(VehicleArray);
      } else {
        console.log("no data avaliable");
        
      }
    }).catch((error)=>{
      console.log(error);
      
    })
  },[])

  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className="col-span-1 lg:col-spa-3 xl:col-span-4">
            <Chart data={vehicles}/>
        </div>
    </div>
  )
}

export default DataChart