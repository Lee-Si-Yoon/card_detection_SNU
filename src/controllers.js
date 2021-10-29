import Graduate from "./models/Graduate";

export const getHome = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const postHome = async (req, res) => {
  const { name } = req.body;
  const exists = await Graduate.exists({ name });
  req.session.name = name;
  if (exists) {
    return res.status(400).render("home", {
      pageTitle: "Home",
      errorMessage:
        "이름이 중복됩니다. 동명이인일 경우 이름 옆에 숫자를 붙여주세요",
    });
  }
  try {
    await Graduate.create({
      name: name,
    });
    return res.redirect("/cert");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

export const getCert = async (req, res) => {
  console.log(res.locals.name);
  return res.render("cert", { pageTitle: "Cert" });
};

export const localsMiddleware = (req, res, next) => {
  res.locals.name = req.session.name || {};
  next();
};
