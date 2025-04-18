import { type RouteConfig, index, route } 
from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/about","./routes/About.tsx"),
    route("/webcam","./routes/Webcam.tsx"),
    route("/vehicle","./routes/Vehicle.tsx"),
] satisfies RouteConfig;
