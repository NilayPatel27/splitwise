'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const HomePage = () => {

  const [contributors, setContributors] = useState([]);
  const [onContributorTextChange, setOnContributorTextChange] = useState("");

  const onClickAdd = () => {
    const temp = JSON.parse(JSON.stringify(contributors));
    temp.push(onContributorTextChange);
    setContributors(temp);
    setOnContributorTextChange("");
  }

  const onContributorTextChanges = (e: any) => {
    setOnContributorTextChange(e.target.value);
  }

  console.log({ contributors });
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div>Add Contributors</div>
      <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", alignItems: "center", margin: "5px" }}>
        <div style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", margin: "5px" }}>

          <Input style={{
            width: '50%',
            height: '30px',
            borderRadius: '5px',
            border: '1px solid black',
            backgroundColor: "white",
            color: "black"
          }}
            placeholder="Item Name"
            accept="text"
            type='text'
            value={onContributorTextChange}
            size={20}
            onChange={(e) => onContributorTextChanges(e)}
          />

          <Button type="button" variant="default" onClick={() => onClickAdd()} disabled={!onContributorTextChange} style={{ margin: '5px', width: '25%', height: '30px' }}>
            Add
          </Button>

        </div>
        <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", margin: "5px", backgroundColor: "white", padding: "5px", border: "1px solid black", borderRadius: "5px", width: "25%" }}>
          {contributors.map((contributor, index) => {
            return (
              <div style={{
                margin: "5px",
                backgroundColor: "white",
                color: "black",
                padding: "5px",
                border: "1px solid black",
                borderRadius: "5px",
                width: "100%"

              }} key={index}
              >{index + 1}. {contributor}</div>
            )
          })}
        </div>
      </div>

      <Link
        href={{
          pathname: '/splitwiseForm',
          query: { contributors: JSON.stringify(contributors) }
        }}
      >
        Go to Summary
      </Link>
    </main>
  )
}

export default HomePage;
