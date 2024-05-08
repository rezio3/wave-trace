import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateOrder = () => {
  return (
    <Box
      sx={{
        width: "60%",
        height: "80%",
        marginTop: "10px",
        bgcolor: "divider",
      }}
      className="p-5 d-flex flex-column align-items-start"
    >
      <h4>Place an order</h4>
      <div className="w-100 d-flex flex-column align-items-start">
        <div className="mt-4 w-100 d-flex align-items-center">
          <TextField
            id="outlined-basic"
            label="Order name / Title"
            variant="outlined"
          />
          <p className="ms-5 mb-0">
          Przykład: "Muzyka do musicalu o rozstaniu".
          </p>
        </div>
        <div className="mt-4 w-100 d-flex align-items-center">
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            //   defaultValue="Description"
            className="w-50"
          />
          <p className="w-25 ms-5 mb-0">
            Nazwa twojego zamówienia. Może być to ogólny skrócony opis muzyki,
            którą zamawiasz. Przykład: "Muzyka do musicalu o rozstaniu".
          </p>
        </div>
        <Button variant="contained" className="mt-4 font-weight-bold">
          Send request
        </Button>
      </div>
    </Box>
  );
};

export default CreateOrder;
