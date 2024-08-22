export interface apiResponse {

    data?:{
    statusCode: number
    isSucces: boolean
    errorMessages: string[]
    result: {
        [key: string]:string
    }
  };
  error?:any
}
  