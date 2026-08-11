"use client";


import {
useState,
} from "react";

import {
Button,
} from "@/components/ui/button";


import {
Input,
} from "@/components/ui/input";


import {
toast,
} from "sonner";


import {
updateProfileName,
} from "../actions";



interface ProfileSettingsProps {

name:string;

email:string;

}



export function ProfileSettings({
name,
email,
}:ProfileSettingsProps){


const [value,setValue] =
useState(name);


const [loading,setLoading] =
useState(false);



async function handleSave(){


try{

setLoading(true);


await updateProfileName(
value
);


toast.success(
"Profile updated"
);


}
catch{

toast.error(
"Failed to update profile"
);

}
finally{

setLoading(false);

}


}




return (

<div className="space-y-4">


<div>


<p className="text-sm text-muted-foreground">
Email
</p>


<p className="font-medium">
{email}
</p>


</div>





<div className="space-y-2">


<p className="text-sm text-muted-foreground">
Name
</p>


<Input

value={value}

onChange={(e)=>
setValue(e.target.value)
}

/>


<Button

onClick={handleSave}

disabled={
loading ||
!value.trim()
}

>

{
loading
?
"Saving..."
:
"Save Changes"
}


</Button>


</div>


</div>

);


}