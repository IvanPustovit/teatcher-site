function userValidation(req, res, next) {
  const { email, password, name, lastName, type, fatherName } = req.body;

  const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passValidNumber = /(?=.*[0-9])[0-9a-zA-Z!@#$%^&*]/g;
  const passValidSymbol = /(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]/g;
  const passValidString = /(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/g;
  const passValidLength = /[0-9a-zA-Z!@#$%^&*]{6,}/g;
  const isEmailValid = emailValid.test(email);
  const isPassValidNumber = passValidNumber.test(password);
  const isPassValidSymbol = passValidSymbol.test(password);
  const isPassValidString = passValidString.test(password);
  const isPassValidLength = passValidLength.test(password);
  if (!isEmailValid) {
    return res
      .status(400)
      .send({ message: "Невірний формат email", body: req.body });
  }
  if (!isPassValidNumber || !isPassValidString || !isPassValidLength) {
    return res.status(400).send({
      message: `Невірний формат пароля. Має бути: ${
        isPassValidNumber ? "" : "одна або декілька цифр; "
      }${isPassValidString ? "" : "дві і більше букв - маленька і велика; "}${
        isPassValidLength ? "" : "довжина пороля має бути від 6 символів;"
      }`,
    });
  }
  if (name !== undefined) {
    const isNameValid = name.length >= 3;
    if (!isNameValid) {
      return res
        .status(400)
        .send({ message: "В імені має бути мінімум 3 символи" });
    }
  }
  if (fatherName !== undefined) {
    const isNameValid = fatherName.length >= 3;
    if (!isNameValid) {
      return res
        .status(400)
        .send({ message: 'В полі /"по батькові/" має бути мінімум 3 символи' });
    }
  }
  if (lastName !== undefined) {
    const isNameValid = lastName.length >= 3;
    if (!isNameValid) {
      return res
        .status(400)
        .send({ message: "В прізвищі має бути мінімум 3 символи" });
    }
    next();
  } else {
    next();
  }
}

module.exports = { userValidation };
