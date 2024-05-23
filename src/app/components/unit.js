'use client'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
   
  export function UnitForm() {
    const [timeonApp,setTimeOnApp]  = useState(0)
    const [timeonWebsite,setTimeOnWebsite] =useState(0)
    const [lengthofMembership,setLengthofMembership] = useState(0)

    const [outputs,setOutputs] = useState([0.0])

    const handleSubmit = async () => {
        const data = [{
          "Time on App": timeonApp,
          "Time on Website": timeonWebsite,
          "Length of Membership": lengthofMembership
        }]
        console.log(JSON.stringify(data))
        const response = await fetch('https://ecommerce-pred-api.onrender.com/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log("result",result)
        
        setOutputs(result.prediction)
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
    <Card color="transparent" shadow={false} className="w-full p-2">
        <Typography variant="h4" color="blue-gray">
          Unit Predictor
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          send individual set of parameters to be predicted
        </Typography>
        <form className="mt-8 mb-2 w-full px-2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Time Spent using the Ecomerce App
            </Typography>
            <Input
              type="number"
              size="lg"
              value={timeonApp}
              onChange={(e)=>setTimeOnApp(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Time Spent using the Ecomerce Website
            </Typography>
            <Input

              size="lg"
              type="number"
              value={timeonWebsite}
              onChange={(e)=>setTimeOnWebsite(e.target.value)}
    
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Length of Membership
            </Typography>
            <Input
              type="number"
              value={lengthofMembership}
              onChange={(e)=>setLengthofMembership(e.target.value)}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button onClick={handleSubmit} className="mt-6" fullWidth>
            predict
          </Button>
         
        </form>
      </Card>
      <div className="w-full bg-stone-300 p-6">
        <Typography variant="h6" color="blue-gray" className="mt-2">
          Predicted Unit
        </Typography>
        <div className="mt-2 flex flex-col">
          {
            outputs.map((output,index) => (
              <Typography key={index} variant="h3" color="blue-gray" className="mt-2">
                {output} unit price
              </Typography>
            )
          )
          }
        </div>
      </div>
      </div>
    );
  }