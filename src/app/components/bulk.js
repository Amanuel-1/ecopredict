"use client";

import { Textarea, input } from "@material-tailwind/react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export function BulkForm() {
  const [inputs, setInputs] = useState([]);

  const [outputs, setOutputs] = useState([0.0]);
  const [error, setError] = useState(false);

  const transformInput = () => {
    try {
      //transforms inputs into an array of numbers
      const rows = inputs.split("\n");

      let data = [];
      setError(false);

      rows.forEach((row) => {
        const [timeonApp, timeonWebsite, lengthofMembership] = row
          .split(",")
          .map((el) => {
            el = el.trim();
            if (el!="") {
              if (isNaN(el)) {
                setError(true);
                throw new Error("Invalid input. Please enter a valid number.");
              }
              return parseFloat(el);
            }
          });
        const unitData = {
          "Time on App": timeonApp,
          "Time on Website": timeonWebsite,
          "Length of Membership": lengthofMembership,
        };

        data.push(unitData);
      });

      return data;
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const handleSubmit = async () => {
    let data = transformInput(inputs);
    if (data) {
      console.log("data", data);
      const response = await fetch(
        "https://ecommerce-pred-api.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log("result", result);

      setOutputs(result.prediction);
    } else {
      setError(true);
    }
  };
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
            <Textarea
              type="number"
              size="lg"
              rows={10}
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
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
        <div className="mt-2">
          {!error && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Input Number</th>
                  <th className="px-4 py-2">Expected Expenditure</th>
                </tr>
              </thead>
              <tbody>
                {outputs.map((output, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{output} unit price</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {error && (
            <div className="text-red-500">
              something is not right. Review your inputs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
