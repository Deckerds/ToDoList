import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  Modal,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { TableCell } from "@material-ui/core";
import { withStyles } from "@mui/styles";
import "./Homepage.css";

const Homepage = () => {
  const [todoList, setTodoList] = useState([]);
  const [filters] = useState({ status: null });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [singleToDo, setSingleToDo] = useState(null);

  const getTodoList = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        // handle success
        setTodoList(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getTodoList();
  }, []);

  // custom table row with different color
  const CustomTableRow = withStyles({
    root: {
      background: "rgb(230 233 255 / 100%) !important",
      height: "3.5rem",
    },
  })(TableRow);

  const applyFilters = (todoList, filters) => {
    return todoList.filter((todo) => {
      let matches = true;
      return matches;
    });
  };

  const applyPagination = (todoList, page, limit) => {
    return todoList.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredList = applyFilters(todoList, filters);
  const paginatedList = applyPagination(filteredList, page, limit);

  const getSingleToDo = (id) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        // handle success
        setSingleToDo(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleOpen = (id) => {
    getSingleToDo(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSingleToDo({});
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card sx={{ padding: 5 }}>
      <h2 className="text-center mb-3">Todo List</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <CustomTableRow>
              <TableCell>ID</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>Title</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>User ID</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>Completed</TableCell>
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {paginatedList &&
              paginatedList.length > 0 &&
              paginatedList.map((todo) => (
                <TableRow
                  sx={{ cursor: "pointer" }}
                  hover
                  key={todo.id}
                  onClick={() => {
                    handleOpen(todo.id);
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" gutterBottom noWrap>
                      {todo.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" gutterBottom noWrap>
                      {todo.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" gutterBottom noWrap>
                      {todo.userId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" gutterBottom noWrap>
                      {todo.completed ? "True" : "False"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <TablePagination
          id="pagination"
          component="div"
          count={filteredList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={style}
          className="d-flex justify-content-center bg-white p-3"
        >
          <div className="d-flex flex-column justify-content-center ">
            <h1 className="text-center">
              <u>ToDo Details</u>
            </h1>
            <Typography variant="h6">
              ID: <span style={{ color: "#A9A9A9" }}>{singleToDo?.id}</span>
            </Typography>
            <Typography variant="h6">
              Title:{" "}
              <span style={{ color: "#A9A9A9" }}>{singleToDo?.title}</span>
            </Typography>
            <Typography variant="h6">
              User ID:{" "}
              <span style={{ color: "#A9A9A9" }}>{singleToDo?.userId}</span>
            </Typography>
            <Typography variant="h6">
              Completed:{" "}
              <span style={{ color: "#A9A9A9" }}>
                {singleToDo?.completed ? "True" : "False"}
              </span>
            </Typography>
          </div>
          <CloseIcon
            onClick={() => handleClose()}
            sx={{ position: "absolute", cursor: "Pointer", right: 0, top: 0 }}
            fontSize="small"
          />
        </div>
      </Modal>
    </Card>
  );
};

export default Homepage;
