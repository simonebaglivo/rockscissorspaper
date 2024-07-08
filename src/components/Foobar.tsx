// Importing: React.
import React from "react";

// Importing: Project components.
import BackHomeButton from "./BackHomeButton";

export default function Foobar() {
  const fooBarStrings: string[] = [];
  const [rows, setRows]: any = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [columns, setColumns]: any = React.useState([[], [], [], [], []]);

  React.useEffect(() => {
    if (!isLoading) return increase();

    createRows();
    setIsLoading(false);
  }, [isLoading]);

  const increase = () => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        addOneRow(i);
      }, 100 * i);
    }
  };

  const addOneRow = (i: number) => {
    const newColumns = columns;
    newColumns[Math.floor(i / 20)].push(rows[i]);
    setColumns([...newColumns]);
  };

  return (
    <>
      <div className="foobar">
        <BackHomeButton />
        <div className="foobar__content">
          {columns.map((column: string[], i: number) => {
            return (
              <div key={i} style={{ width: "20%" }}>
                {column.map((content: string, index: number) => {
                  return (
                    <p key={`${content}, ${1 + index + i * 20}`}>
                      <b>{1 + index + i * 20}</b>: {content}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  function createRows() {
    let row = "";
    const length = fooBarStrings.length + 1;

    if (length % 3 === 0) row = row.concat("Foo");
    if (length % 5 === 0) row = row.concat("Bar");
    if (row === "") row = row.concat(`${length}`);
    fooBarStrings.push(row);

    if (fooBarStrings.length < 100) {
      createRows();
    }

    setRows(fooBarStrings);
  }
}
