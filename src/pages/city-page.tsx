import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CurrentWeather from "@/components/ui/current-weather";
import FavoriteButton from "@/components/ui/favoritebutton";
import HourlyTemperature from "@/components/ui/hourly-temperature";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import WeatherDetails from "@/components/ui/weather-details";
import WeatherForecast from "@/components/ui/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; 
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CityPage = () => {
  const [searchParams]= useSearchParams();
  const params =useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
   
  const coordinates = {lat, lon};

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if(weatherQuery.error || forecastQuery.error){
        return(
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
               
            </AlertDescription>
        </Alert>
        )
     }

     if(!weatherQuery.data || !forecastQuery.data || !params.cityName){
        return <WeatherSkeleton />
     }


    return(
        <div className="space-y-4">
        {/* Favorite Cities */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {params.cityName}, {weatherQuery.data.sys.country}
            </h1>
            <div>
                <FavoriteButton data={{... weatherQuery.data, name: params.cityName}} />
            </div>  

        </div>
       
        <div className="grid gap-4">
          <div className="flex flex-row gap-2">
                <CurrentWeather data={weatherQuery.data} 
                />                
                <HourlyTemperature data={forecastQuery.data}
                />
            {/* hourly temperature */}
          </div>  

          <div className="grid gap-4 md:grid-cols-2 items-start">
            <WeatherDetails data={weatherQuery.data}/>
        
            {/*forecast*/}
            <WeatherForecast data={forecastQuery.data}/>

          </div>  
        
        </div>

        <div className="mt-8 h-96">
        <MapContainer
          center={[lat, lon]} // Şehir koordinatları
          zoom={12}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
         <Marker position={[lat, lon]} icon={customIcon}>
          <Popup>{params.cityName}</Popup>
         </Marker>
        </MapContainer>
      </div>
     </div>     
    )

    

};

export default CityPage;