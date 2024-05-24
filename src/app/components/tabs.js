'use client'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { UnitForm } from "./unit";
import { BulkForm } from "./bulk";
import { JsonForm } from "./json";
   
  export function InputTabs() {
    const data = [
      {
        label: "Unit Prediction",
        value: "html",
        desc: <UnitForm/>,
      },
      {
        label: "Bulk Prediction",
        value: "bulk",
        desc: <BulkForm/>,
      },
      {
        label: "Bulk Prediction(JSON)",
        value: "bulk-json",
        desc: <JsonForm/>,
      },
 
    ];
   
    return (
      <Tabs value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }