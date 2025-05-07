import { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

interface HourlyTemperature {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperature) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1 pt-25">
      <CardHeader>
        <CardTitle className="pl-16"> Today's Temperature </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span
                              className="text-[0.70rem] uppercase
                                                     text-muted-foreground"
                            >
                              Temprature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span
                            className="text-[0.70rem] uppercase
                                                text-muted-foreground"
                          >
                            Feels Like
                          </span>
                          <span>{payload[1].value}°</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="natural"
                dataKey="temp"
                stroke="#2563eb"
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
