export const BaseUrl = `https://ecommerce-herosholine-mern-app.herokuapp.com/api/v1`;

const colors =
  "Beige Black Blue Brown Coral Cream Fuchisa Gold Green Grey Grey-Melange Khaki Lavendar Maroon Metallic Multicolor Mustard Navy-Blue Nude Olive Orange Peach Pink Purple Red Rust Silver Sky-Blue Sultan Teal Tan White Yellow";

export const colorArray = colors.split(" ");

export const SignUpFromData = [
  {
    htmlFor: "name",
    type: "text",
    name: "name",
    id: "name",
    placeholder: "Enter Your Name",
  },
  {
    htmlFor: "email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Enter Your Email",
  },
  {
    htmlFor: "password",
    type: "password",
    name: "password",
    id: "password",
    placeholder: "Enter Your Password",
  },
];

export const LogInFormData = [
  {
    htmlFor: "email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Enter Your Email",
  },
  {
    htmlFor: "password",
    type: "password",
    name: "password",
    id: "password",
    placeholder: "Enter Your Password",
  },
];

export const ItemFormData = [
  {
    htmlFor: "title",
    type: "text",
    name: "title",
    id: "title",
    placeholder: "Enter Your Product title",
  },
  {
    htmlFor: "sku",
    type: "text",
    name: "sku",
    id: "sku",
    placeholder: "Enter Unique Sku",
  },
  {
    htmlFor: "article_number",
    type: "text",
    name: "article_number",
    id: "article_number",
    placeholder: "Enter Same Article Number For Size Varient",
  },
  {
    htmlFor: "style_code",
    type: "text",
    name: "style_code",
    id: "style_code",
    placeholder: "Enter Same Style Code For Color Varient",
  },
  {
    htmlFor: "color",
    name: "color",
    id: "color",
    options: colorArray,
  },
  {
    htmlFor: "size",
    name: "size",
    id: "size",
    options: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    htmlFor: "type",
    name: "type",
    id: "type",
    options: ["Flat", "Heel", "Bellie"],
  },
  {
    htmlFor: "stock",
    type: "number",
    name: "stock",
    id: "stock",
    placeholder: "Enter No Of Quantity",
  },
  {
    htmlFor: "list_price",
    type: "number",
    name: "list_price",
    id: "list_price",
    placeholder: "Enter Listing Price",
  },
  {
    htmlFor: "mrp",
    type: "number",
    name: "mrp",
    id: "mrp",
    placeholder: "Enter MRP Price",
  },
  {
    htmlFor: "image_url_1",
    type: "text",
    name: "image_url_1",
    id: "image_url_1",
    placeholder: "Enter Image Url",
  },
  {
    htmlFor: "image_url_2",
    type: "text",
    name: "image_url_2",
    id: "image_url_2",
    placeholder: "Enter Image Url",
  },
  {
    htmlFor: "image_url_3",
    type: "text",
    name: "image_url_3",
    id: "image_url_3",
    placeholder: "Enter Image Url",
  },
  {
    htmlFor: "image_url_4",
    type: "text",
    name: "image_url_4",
    id: "image_url_4",
    placeholder: "Enter Image Url",
  },
];

export const ShippingFormData = [
  {
    htmlFor: "name",
    type: "text",
    name: "name",
    id: "name",
    placeholder: "Enter Your Name",
  },
  {
    htmlFor: "email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Enter Your email",
  },
  {
    htmlFor: "state",
    type: "text",
    name: "state",
    id: "state",
    placeholder: "Enter Your State",
  },
  {
    htmlFor: "city",
    type: "text",
    name: "city",
    id: "city",
    placeholder: "Enter Your city",
  },
  {
    htmlFor: "address",
    type: "text",
    name: "address",
    id: "address",
    placeholder: "Enter Your Address",
  },
  {
    htmlFor: "pin_code",
    type: "number",
    name: "pin_code",
    id: "pin_code",
    placeholder: "Enter Your Pin Code",
  },
  {
    htmlFor: "phone_number",
    type: "number",
    name: "phone_number",
    id: "phone_number",
    placeholder: "Enter Your Phone Number",
  },
];
