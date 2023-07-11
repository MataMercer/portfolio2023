import { derived, writable } from 'svelte/store';

export const apiData = writable([]);

// export const repos = derived(apiData, ($apiData) =>{
//     if($apiData){
//         return $apiData.
//     }
// })
