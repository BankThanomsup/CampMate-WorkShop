import { resizeFile } from "@/utils/resizeimage";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useAuth } from "@clerk/clerk-react";
import { uploadFileImage } from "@/api/ีีuploadFileImage";
import { RotateCw } from "lucide-react";
import { useState } from "react";

const FromUploadImage = ({ setValue }) => {
  const [isLoading, setIsLoading] = useState(false);

  //JS
  const { getToken } = useAuth();
  const hdlOnChange = async (e) => {
    setIsLoading(true);
    const token = await getToken();
    // console.log(token)
    const file = e.target.files[0];
    if (!file) return;
    try {
      const resizedImage = await resizeFile(file);
      // console.log(token)
      const res = await uploadFileImage(token, resizedImage);
    //   console.log(res.data.result);
      setValue("image", res.data.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Label>Upload Image</Label>
      <div className="flex item-center gap-2">
        <Input type="file" onChange={hdlOnChange} />
        {
            isLoading && <RotateCw className="animate-spin" />
        }
      </div>
    </div>
  );
};

export default FromUploadImage;
