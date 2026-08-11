"use client";


import {
useMutation,
} from "@tanstack/react-query";


import {
createPractice,
submitPractice,
} from "./actions";



export function useCreatePractice(){


return useMutation({

mutationFn:
createPractice,

});


}



export function useSubmitPractice(){


return useMutation({

mutationFn:
submitPractice,

});


}