
import { formatNumber } from "@/utils/formats";
import { Card, CardHeader } from "../ui/card";


const StateCard = ({label,value}) => {

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-semibold">{label}</h1>
        <span className="text-4xl font-extrabold">{formatNumber(value)}</span>
      </CardHeader>
    </Card>
  );
};

export default StateCard;
