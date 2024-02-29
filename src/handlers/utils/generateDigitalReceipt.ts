import ejs from "ejs";

const generateDigitalReceipt = (
  orderId: string,
  customerEmail: string,
  date: Date,
  totalPrice: number
) => {
  // Sample EJS template
  const receiptTemplate = `
        <h1>Receipt for Order <%= orderId %></h1>
        <p>Customer: <%= customerEmail %></p>
        <p>Total Amount: $<%= totalPrice %></p>
        <p>Timestamp: <%= date %></p>
    `;

  // Compile the template and fill in the data
  const compiledTemplate = ejs.compile(receiptTemplate);
  const formattedReceipt = compiledTemplate({
    orderId,
    customerEmail,
    totalPrice,
    date,
  });

  return formattedReceipt;
};

export default generateDigitalReceipt;
