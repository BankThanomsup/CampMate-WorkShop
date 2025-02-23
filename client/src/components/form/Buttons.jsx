import { Button } from "../ui/button"
import { RotateCw } from 'lucide-react';
const Buttons = ({text , isPending , type}) => {

    return (
        <Button disabled={isPending} className="capitalize mt-2">
            {isPending ? <><RotateCw className="animate-spin"/><span>Please wait ...</span></> : <p>{text}</p>}
            {/* {text} */}
            </Button>
    )
}
export default Buttons