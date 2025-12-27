// const url = "http:localhost:3000/test";

// (async () => {
//   for (let i = 0; i < 100; i++) {
//     let res = await fetch(url, {
//       method: "get",
//     });
//     // const rj = await res.json();
//     console.log("res is ", i, "   ", res.body);
//   }
// })();

/*
server side code 

async function someFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        reject(new Error("Random error in someFunction!"));
      } else {
        resolve("operation successful.");
      }
    }, Math.random() * 1500);
  });
}

app.get("/test", (req, res, next) => {
  try {
    someFunction().then((msg) => res.send(msg));
    // res.send("Test route");
  } catch (err) {
    res.status(500).send("Internal Server Error occurred.");
  }
});
*/

// nested component checkboxex

import React, { useState } from "react";
import { render } from "react-dom";
import "./style.css";

const testNestedData = [
  {
    id: 1,
    name: "node 1",
    childs: [
      {
        id: 2,
        name: "node 2",
        childs: [
          {
            id: 6,
            name: "node 6",
            childs: [
              {
                id: 12,
                name: "node 12",
              },
            ],
          },
          {
            id: 8,
            name: "node 8",
          },
          {
            id: 7,
            name: "node 7",
          },
        ],
      },
      {
        id: 5,
        name: "node 5",
        childs: [
          {
            id: 10,
            name: "node 10",
          },
          {
            id: 11,
            name: "node 11",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "node 3",
    childs: [],
  },
  {
    id: 13,
    name: "node 13",
    childs: [],
  },
];

const Tree = ({ data, checked, setChecked }) => {
  const handleChecked = (isChecked, node) => {
    setChecked((prev) => {
      let newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (arr) => {
        arr?.childs?.forEach((c) => {
          newState[c.id] = isChecked;
          updateChildren(c);
        });
      };
      updateChildren(node);

      // if all the childs are checked check the parent , by reading through all the data.
      const verifyChecked = (node) => {
        if (!node.childs) {
          return newState[node.id] || false;
        }
        const childrensChecked = node.childs?.forEach((child) =>
          verifyChecked(child)
        );

        newState[node.id] = childrensChecked;

        return childrensChecked;
      };

      testNestedData.forEach((node) => verifyChecked(node));

      return newState;
    });
  };
  console.log("state ", checked);
  return (
    <div>
      {data.map((node, id) => (
        <div style={{ paddingLeft: "20px" }} key={id}>
          <input
            type="checkbox"
            onChange={(e) => handleChecked(e.target.checked, node)}
            checked={checked[node.id] || false}
          />
          {node.name}

          {node.childs?.length > 0 && (
            <Tree
              data={node.childs}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [checked, setChecked] = useState({});
  return (
    <div>
      <p>This is the app</p>
      <Tree data={testNestedData} checked={checked} setChecked={setChecked} />
    </div>
  );
}

render(<App />, document.getElementById("root"));
