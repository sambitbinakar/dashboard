import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import AreaVarient from './AreaVarient';



interface Vehicles {
    color:string;
    company:string;
    entry_time: string;
    exit_time:string;
    number_plate: string;
    track_id:number;
    vehicle_type:string;
  }

interface CartProps {
  data: Vehicles[];
}

const Chart: React.FC<CartProps> = ({data}) => {
  return (
    <Card className='border-none drop-shadow-sm'>
        <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-center'>
            <CardTitle className='text-xl line-clamp-1'> 
                Vehicle Categories
            </CardTitle>
        </CardHeader>
        <CardContent>
            {data.length === 0 ? (
                <div className="flex flex-col gap-y-4 items-center justify-center h-[300px] w-full">
                  <p className='text-muted-foreground text-sm'>No data for this Period</p>
                </div>
            ) : (
                <AreaVarient databasePath={data.map(vehicle => vehicle.company).join(', ')}/>
            )}
        </CardContent>
    </Card>
  )
}

export default Chart