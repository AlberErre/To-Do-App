import React from "react";
import { Button, Table, TableRow, TableCell, Text  } from '@aragon/ui';
import "../App.css";

const HistoryList = (props) => {
  return (
    <div>
      <div className="historyTableContainer">
        <Table
          header={
            <TableRow>
              <TableCell>
                <Text smallcaps>Action</Text>
              </TableCell>
              <TableCell>
                <Text smallcaps>Date</Text>
              </TableCell>
              <TableCell>
                <Text smallcaps>Title</Text>
              </TableCell>
              <TableCell>
                <Text smallcaps>Description</Text>
              </TableCell>
            </TableRow>
          }>
        {
          props.toDoHistoryList.map( toDo => {
            return(
              <TableRow>
                <TableCell>
                  <Text>{toDo.action}</Text>
                </TableCell>
                <TableCell>
                  <Text>{toDo.creationDate}</Text>
                </TableCell>
                <TableCell>
                  <Text>{toDo.name}</Text>
                </TableCell>
                <TableCell>
                  <Text>{toDo.description}</Text>
                </TableCell>
              </TableRow>
            )
          })
        }
        </Table>
      </div>

      <div className="historyModalButtons">
        <Button mode="outline" onClick={() => props.toggleHistoryModal()}>
          Close
        </Button>
        <Button mode="strong" emphasis="negative" onClick={() => props.clearFirebaseHistory()}>
          Clear history
        </Button>
      </div>
    </div>
  );
};

export default HistoryList;
