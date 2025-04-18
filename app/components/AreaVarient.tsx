import {
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../lib/firebaseconfig"; // Assuming you have your Firebase config

interface VehicleDataRaw {
  color: string;
  company: string;
  date: string; // Date is now a string in "DD:MM:YYYY" format
  entry_time: string;
  exit_time: string;
  number_plate: string;
  track_id: number;
  vehicle_type: string;
}

interface ChartData {
  date: string;
  Car: number;
  Motorcycle: number;
  Scooter: number;
  "Auto Rickshaw": number;
  Bus: number;
}

interface Props {
  databasePath: string;
}

const AreaVariant = ({ databasePath }: Props) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null);

      const vehiclesRef = ref(database,'parking_data');

      onValue(vehiclesRef, (snapshot) => {
        const data: { [key: string]: VehicleDataRaw } | null = snapshot.val();
        if (data) {
          const vehicleArray: VehicleDataRaw[] = Object.values(data);
          if (vehicleArray.length > 0) {
            const groupedData: { [key: string]: { [key: string]: Set<string> } } = {};
            vehicleArray.forEach((item) => {
              try {
                // Extract date in "YYYY-MM-DD" format for consistent grouping
                const dateParts = item.date.split(':');
                const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

                if (!groupedData[formattedDate]) {
                  groupedData[formattedDate] = {
                    Car: new Set<string>(),
                    Motorcycle: new Set<string>(),
                    Scooter: new Set<string>(),
                    "Auto Rickshaw": new Set<string>(),
                    Bus: new Set<string>(),
                  };
                }
                groupedData[formattedDate][item.vehicle_type].add(item.number_plate);
              } catch (e) {
                console.error("Error processing date:", item.date, e);
              }
            });

            const formattedData: ChartData[] = Object.keys(groupedData)
              .sort()
              .map((date) => ({
                date,
                Car: groupedData[date].Car.size,
                Motorcycle: groupedData[date].Motorcycle.size,
                Scooter: groupedData[date].Scooter.size,
                "Auto Rickshaw": groupedData[date]["Auto Rickshaw"].size,
                Bus: groupedData[date].Bus.size,
              }));

            setChartData(formattedData);
          } else {
            setChartData([]);
          }
          setLoading(false);
        } else {
          setChartData([]);
          setLoading(false);
        }
      }, (err) => {
        setError(err.message);
        console.error("Error fetching data from Firebase:", err);
        setLoading(false);
      });
    };

    fetchData();

    return () => {
      // Clean up listener (optional)
    };
  }, ['parking_data']);

  const vehicleTypes = ["Car", "Motorcycle", "Scooter", "Auto Rickshaw", "Bus"];
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4add3"];

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error fetching data from Firebase: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" className="text-xs"/>
        <YAxis />
        <Tooltip />
        {vehicleTypes.map((type, index) => (
          <Area
            key={type}
            type="monotone"
            dataKey={type}
            stackId="2"
            stroke={colors[index % colors.length]}
            fill="None"
            name={type}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaVariant;