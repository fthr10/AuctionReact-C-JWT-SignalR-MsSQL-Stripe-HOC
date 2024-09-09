import React from 'react'
import { useRemoveVehicleMutation} from '../../Api/vehicleApi'
import { ToastrNotify } from '../../Helper';


function RemoveVehicle(props:{vehicleId:number}) {
  
    const [removeVehicleMutation] = useRemoveVehicleMutation();
    
    const handleRemoveVehicleEvent= () => {
        const response : any = removeVehicleMutation(props.vehicleId).then((response) => {
            console.log(response);
        })
        console.log(props.vehicleId);
        console.log(response);
        if(response.data?.isSucces) {
            ToastrNotify("Remove Procces is Success","success");
        }

        }
    
  
  
  
  
    return (
    <div>
      <button className="btn btn-danger" onClick={()=>handleRemoveVehicleEvent()}>
      <i className="bi bi-trash-fill"></i> 
      </button>
    </div>
  )
}

export default RemoveVehicle
