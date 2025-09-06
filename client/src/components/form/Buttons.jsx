import { Button } from "../ui/button"
import { RotateCw, Sparkles } from 'lucide-react';

const Buttons = ({text , isPending , type}) => {
    return (
        <Button 
            disabled={isPending} 
            className="
                w-full bg-gradient-to-r from-blue-600 to-purple-600 
                hover:from-blue-700 hover:to-purple-700 
                text-white font-semibold px-8 py-4 rounded-xl 
                transition-all duration-300 transform hover:scale-[1.02] 
                hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed
                disabled:transform-none
            "
        >
            {isPending ? (
                <div className="flex items-center gap-3">
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>Please wait...</span>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    <span>{text}</span>
                </div>
            )}
        </Button>
    )
}
export default Buttons