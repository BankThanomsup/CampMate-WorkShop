import { categories } from "@/utils/catagories";
import { useSearchParams } from "react-router";

const CategoryLists = () => {

 const [searchParams, setSearchParams] = useSearchParams()

 const hdlFilter = ( category ) =>{
    console.log(category);
    // setSearchParams(category)
    const params = new URLSearchParams(searchParams)
    const c = searchParams.get('category') || ''
    if(c === category){
        params.delete("category")
    }else{
        params.set("category",category)
    }
    setSearchParams(params)
 }

 const activeCategory = searchParams.get('category') || ''

  return (
    <div className="mb-8">
      <div className="flex justify-center items-center">
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar max-w-full">
          {categories.map((item) => {
            const isActive = activeCategory === item.label;
            return (
              <button
                onClick={() => hdlFilter(item.label)}
                className={`
                  flex flex-col items-center min-w-[80px] p-4 rounded-xl 
                  transition-all duration-300 hover:shadow-lg group flex-shrink-0
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg'
                  }
                `}
                key={item.label}
              >
                <div className={`
                  mb-2 p-2 rounded-lg transition-colors duration-300
                  ${isActive 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 group-hover:bg-blue-100'
                  }
                `}>
                  <item.icon className={`
                    w-6 h-6 transition-colors duration-300
                    ${isActive 
                      ? 'text-white' 
                      : 'text-gray-600 group-hover:text-blue-600'
                    }
                  `} />
                </div>
                <p className={`
                  text-sm font-semibold capitalize transition-colors duration-300 whitespace-nowrap
                  ${isActive 
                    ? 'text-white' 
                    : 'text-gray-700 group-hover:text-blue-600'
                  }
                `}>
                  {item.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryLists;
