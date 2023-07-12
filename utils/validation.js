export const validateEmail = (email) => {
  const regexSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexSt.test(email);
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;
  const checks = [
    {
      msg: "Name, Description, Brand added successfully",
      type: "success",
    },
  ];
  if (images.length < 3) {
    checks.push({
      msg: `Choose atleast 3 images (${3 - images.length} remaining.)`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images.length} images choosen`,
      type: "success",
    });
  }

  if (!product.color.color) {
    checks.push({
      msg: `Choose a main product color`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Product color has been choosen`,
      type: "success",
    });
  }
  if (!product.color.image) {
    checks.push({
      msg: `Choose a main product style image`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Product style image has been choosen`,
      type: "success",
    });
  }
  let flag1 = 0;
  let flag2 = 0;
  let flag3 = 0;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].qty == "" || sizes[i].price == "" || sizes[i].size == "") {
      flag1 = 1;
      checks.push({
        msg: `Please fill all informations on sizes`,
        type: "error",
      });
      break;
    }
  }

  for (let i = 0; i < details.length; i++) {
    if (details[i].name == "" || details[i].value == "") {
      flag2 = 1;
      checks.push({
        msg: `Please fill all informations on details`,
        type: "error",
      });
      break;
    }
  }

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].question == "" || questions[i].question == "") {
      flag3 = 1;
      checks.push({
        msg: `Please fill all informations on questions`,
        type: "error",
      });
      break;
    }
  }
  if (flag1 == 0) {
    checks.push({
      msg: "Size/qty/price have been added successfully.",
      type: "success",
    });
  }
  if (flag2 == 0) {
    checks.push({
      msg: "Details have been added successfully.",
      type: "success",
    });
  }
  if (flag3 == 0) {
    checks.push({
      msg: "Questions answers have been added successfully.",
      type: "success",
    });
  }

  let s_test = checks.find((c) => c.type == "error");

  if (s_test) {
    return checks;
  } else {
    return "valid";
  }

  return checks;
};
