import {get, ref } from 'firebase/database';
import {  useEffect, useState } from 'react';
import { database } from '~/lib/firebaseconfig';
import VehicleTable from '~/pages/VehicleTable';

interface Vehicles {
  color:string;
  company:string;
  entry_time: string;
  exit_time:string;
  number_plate: string;
  track_id:number;
  vehicle_type:string;
}

const Vehicle = () => {
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
    <div>
      
        <VehicleTable vehicle={vehicles}/>
      
    </div>
  )
}

export default Vehicle 